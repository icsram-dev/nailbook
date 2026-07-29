import { prisma } from "@/lib/prisma";

interface CheckAppointmentOverlapParams {
  startTime: Date;
  endTime: Date;
  appointmentId?: string;
}

export async function checkAppointmentOverlap({
  startTime,
  endTime,
  appointmentId,
}: CheckAppointmentOverlapParams): Promise<boolean> {
  const overlappingAppointment = await prisma.appointment.findFirst({
    where: {
      id: appointmentId
        ? {
            not: appointmentId,
          }
        : undefined,

      status: {
        notIn: ["CANCELLED", "NO_SHOW"],
      },

      startTime: {
        lt: endTime,
      },

      endTime: {
        gt: startTime,
      },
    },
    select: {
      id: true,
    },
  });

  return overlappingAppointment !== null;
}