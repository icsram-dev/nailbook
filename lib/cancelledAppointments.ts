import { prisma } from "@/lib/prisma";
import { CancelledBy } from "@prisma/client";

export async function getCancelledAppointments() {
  const appointments = await prisma.appointment.findMany({
    where: {
      status: "CANCELLED",
    },

    include: {
      customer: true,
      service: true,
    },

    orderBy: {
      cancelledAt: "desc",
    },
  });

 return appointments.map((appointment) => ({
  id: appointment.id,

  customerId: appointment.customer.id,

  customerName: appointment.customer.name,
  customerEmail: appointment.customer.email,
  customerPhone: appointment.customer.phone,

  serviceName: appointment.service.name,

  appointmentDate: appointment.startTime,

  cancelledAt: appointment.cancelledAt,

  cancelledBy:
    appointment.cancelledBy === CancelledBy.ADMIN
      ? "Admin"
      : "Vendég",

  cancelReason: appointment.cancelReason,
}));
}