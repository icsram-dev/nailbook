import { WeekDay } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import type {
  AvailableTimeSlot,
  GetAvailableTimesInput,
} from "./types";

export async function getAvailableTimeSlots({
  date,
  serviceId,
}: GetAvailableTimesInput): Promise<AvailableTimeSlot[]> {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    return [];
  }

  const days: WeekDay[] = [
    WeekDay.SUNDAY,
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
  ];

  const day = days[date.getDay()];

  const openingHour = await prisma.openingHour.findUnique({
    where: {
      day,
    },
  });

  if (
    !openingHour ||
    !openingHour.isOpen ||
    !openingHour.opensAt ||
    !openingHour.closesAt
  ) {
    return [];
  }

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: dayStart,
        lte: dayEnd,
      },

      status: {
        notIn: ["CANCELLED", "NO_SHOW"],
      },
    },

    orderBy: {
      startTime: "asc",
    },
  });

  const vacations = await prisma.vacation.findMany({
    where: {
      startDate: {
        lte: dayEnd,
      },

      endDate: {
        gte: dayStart,
      },
    },
  });

  console.log({
    service,
    openingHour,
    appointments,
    vacations,
  });

  return [];
}