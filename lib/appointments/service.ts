import { randomUUID } from "crypto";

import { AppointmentStatus } from "@prisma/client";
import { getSettings } from "@/lib/settings";

import { prisma } from "@/lib/prisma";
import {
  sendBookingRequest,
  sendBookingCancelledByAdmin,
  sendBookingUpdated,
  sendBookingConfirmed,
} from "@/lib/mail";

import { validateAppointment } from "./validation";

interface CreateAppointmentInput {
  customerId: string;
  serviceId: string;
  startTime: Date;
  customerNote?: string;
  status?: AppointmentStatus;
}

interface UpdateAppointmentInput {
  appointmentId: string;
  customerId: string;
  serviceId: string;
  startTime: Date;
  customerNote?: string;
  status?: AppointmentStatus;
}

export async function getAppointmentById(id: string) {
  return prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      service: true,
    },
  });
}

export async function createAppointment({
  customerId,
  serviceId,
  startTime,
  customerNote,
  status,
}: CreateAppointmentInput) {
  const validation = await validateAppointment({
    serviceId,
    startTime,
  });

  if (!validation.ok) {
    throw new Error(validation.message);
  }

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("A szolgáltatás nem található.");
  }

  const settings = await getSettings();

  const appointmentStatus =
    status ??
    (settings?.autoConfirmBookings ? AppointmentStatus.CONFIRMED : AppointmentStatus.PENDING);

  const appointment = await prisma.appointment.create({
    data: {
      customerId,
      serviceId,
      startTime,
      endTime: validation.endTime,
      price: service.price,
      customerNote,
      status: appointmentStatus,
      cancelToken: randomUUID(),
    },
    include: {
      customer: true,
      service: true,
    },
  });

  try {
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?token=${appointment.cancelToken}`;

    if (appointment.status === AppointmentStatus.PENDING) {
      await sendBookingRequest({
        to: appointment.customer.email,
        customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
        serviceName: appointment.service.name,
        appointmentDate: appointment.startTime.toLocaleDateString("hu-HU"),
        appointmentTime: appointment.startTime.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cancelUrl,
      });
    } else {
      await sendBookingConfirmed({
        to: appointment.customer.email,
        customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
        serviceName: appointment.service.name,
        appointmentDate: appointment.startTime.toLocaleDateString("hu-HU"),
        appointmentTime: appointment.startTime.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cancelUrl,
      });
    }
  } catch (error) {
    console.error("Nem sikerült elküldeni a foglalási e-mailt:", error);
  }

  return appointment;
}

export async function updateAppointment({
  appointmentId,
  customerId,
  serviceId,
  startTime,
  customerNote,
  status,
}: UpdateAppointmentInput) {
  const currentAppointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    include: {
      customer: true,
      service: true,
    },
  });

  if (!currentAppointment) {
    throw new Error("A foglalás nem található.");
  }

  const validation = await validateAppointment({
    serviceId,
    startTime,
    appointmentId,
  });

  if (!validation.ok) {
    throw new Error(validation.message);
  }

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("A szolgáltatás nem található.");
  }

  const appointment = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      customerId,
      serviceId,
      startTime,
      endTime: validation.endTime,
      price: service.price,
      customerNote,
      status,
    },
    include: {
      customer: true,
      service: true,
    },
  });

  try {
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?token=${appointment.cancelToken}`;

    // Admin jóváhagyta a foglalást
    if (
      currentAppointment.status === AppointmentStatus.PENDING &&
      appointment.status === AppointmentStatus.CONFIRMED
    ) {
      await sendBookingConfirmed({
        to: appointment.customer.email,
        customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
        serviceName: appointment.service.name,
        appointmentDate: appointment.startTime.toLocaleDateString("hu-HU"),
        appointmentTime: appointment.startTime.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cancelUrl,
      });
    }

    // Admin módosította az időpontot
    else if (
      currentAppointment.startTime.getTime() !== appointment.startTime.getTime() ||
      currentAppointment.serviceId !== appointment.serviceId
    ) {
      await sendBookingUpdated({
        to: appointment.customer.email,
        customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
        serviceName: appointment.service.name,
        appointmentDate: appointment.startTime.toLocaleDateString("hu-HU"),
        appointmentTime: appointment.startTime.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cancelUrl,
      });
    }
  } catch (error) {
    console.error("Nem sikerült elküldeni az értesítő e-mailt:", error);
  }

  return appointment;
}

export async function cancelAppointment(id: string) {
  const appointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status: AppointmentStatus.CANCELLED,
      cancelToken: null,
      cancelledBy: "ADMIN",
      cancelledAt: new Date(),
    },
    include: {
      customer: true,
      service: true,
    },
  });

  try {
    await sendBookingCancelledByAdmin({
      to: appointment.customer.email,
      customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
      serviceName: appointment.service.name,
      appointmentDate: appointment.startTime.toLocaleDateString("hu-HU"),
      appointmentTime: appointment.startTime.toLocaleTimeString("hu-HU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } catch (error) {
    console.error("Nem sikerült elküldeni a törlési e-mailt:", error);
  }

  return appointment;
}
