import { WeekDay } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function getWeekDay(date: Date): WeekDay {
  const days: WeekDay[] = [
    WeekDay.SUNDAY,
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
  ];

  return days[date.getDay()];
}

export async function getService(serviceId: string) {
  return prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });
}

export async function getOpeningHours(date: Date) {
  return prisma.openingHour.findUnique({
    where: {
      day: getWeekDay(date),
    },
  });
}

export async function getAppointments(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.appointment.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        notIn: ["CANCELLED", "NO_SHOW"],
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

export async function getVacations(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.vacation.findMany({
    where: {
      startDate: {
        lte: endOfDay,
      },
      endDate: {
        gte: startOfDay,
      },
    },
  });
}
