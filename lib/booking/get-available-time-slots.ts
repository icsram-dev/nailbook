import { getDay } from "date-fns";

import { prisma } from "@/lib/prisma";

import { applyAvailability } from "./availability";
import { generateTimeSlots } from "./generate-time-slots";

import type { TimeSlot } from "@/types/time-slot";
import { WeekDay } from "@prisma/client";

type GetAvailableTimeSlotsOptions = {
  date: Date;
  serviceId: string;
};

const WEEK_DAY_MAP: Record<number, WeekDay> = {
  0: WeekDay.SUNDAY,
  1: WeekDay.MONDAY,
  2: WeekDay.TUESDAY,
  3: WeekDay.WEDNESDAY,
  4: WeekDay.THURSDAY,
  5: WeekDay.FRIDAY,
  6: WeekDay.SATURDAY,
};

export async function getAvailableTimeSlots({
  date,
  serviceId,
}: GetAvailableTimeSlotsOptions): Promise<TimeSlot[]> {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("A szolgáltatás nem található.");
  }

  const weekDay = WEEK_DAY_MAP[getDay(date)];

  const openingHour = await prisma.openingHour.findUnique({
    where: {
      day: weekDay,
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

  const [appointments, vacations] =
    await prisma.$transaction([
      prisma.appointment.findMany({
        where: {
          status: {
  notIn: [
    "CANCELLED",
    "NO_SHOW",
  ],
},
          startTime: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        select: {
          startTime: true,
          endTime: true,
        },
      }),

      prisma.vacation.findMany({
        where: {
          startDate: {
            lte: dayEnd,
          },
          endDate: {
            gte: dayStart,
          },
        },
        select: {
          startDate: true,
          endDate: true,
        },
      }),
    ]);

  const slots = generateTimeSlots({
    date,
    openingTime: openingHour.opensAt,
    closingTime: openingHour.closesAt,
    serviceDuration: service.duration,
  });

  return applyAvailability({
    slots,
    appointments,
    vacations,
  });
}