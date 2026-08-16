import { prisma } from "@/lib/prisma";

export function calculateEndTime(startTime: Date, duration: number) {
  const endTime = new Date(startTime);

  endTime.setMinutes(endTime.getMinutes() + duration);

  return endTime;
}

export async function findOverlappingAppointment(
  startTime: Date,
  endTime: Date,
  excludeAppointmentId?: string
) {
  return prisma.appointment.findFirst({
    where: {
      ...(excludeAppointmentId && {
        id: {
          not: excludeAppointmentId,
        },
      }),

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
  });
}
