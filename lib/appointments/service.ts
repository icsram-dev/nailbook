import { AppointmentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { validateAppointment } from "./validation";

interface CreateAppointmentInput {
  customerId: string;
  serviceId: string;
  startTime: Date;
  note?: string;
  status?: AppointmentStatus;
}

interface UpdateAppointmentInput extends CreateAppointmentInput {
  appointmentId: string;
}

export async function createAppointment({
  customerId,
  serviceId,
  startTime,
  note,
  status = AppointmentStatus.CONFIRMED,
}: CreateAppointmentInput) {
  const validation = await validateAppointment({
    customerId,
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

  return prisma.appointment.create({
    data: {
      customerId,
      serviceId,
      startTime,
      endTime: validation.endTime,

      price: service.price,

      customerNote: note,

      status,
    },
    include: {
      customer: true,
      service: true,
    },
  });
}

export async function updateAppointment({
  appointmentId,
  customerId,
  serviceId,
  startTime,
  note,
  status,
}: UpdateAppointmentInput) {
  const validation = await validateAppointment({
    customerId,
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

  return prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      customerId,
      serviceId,
      startTime,
      endTime: validation.endTime,

      price: service.price,

      customerNote: note,

      status,
    },
    include: {
      customer: true,
      service: true,
    },
  });
}