import { prisma } from "@/lib/prisma";
import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export async function getDashboardData() {
  const today = new Date();

  const [
    todayAppointments,
    tomorrowAppointments,
    pendingAppointments,
    cancelledAppointments,
    noShowAppointments,
    weeklyRevenue,
    monthlyRevenue,
    pendingList,
  ] = await Promise.all([
    prisma.appointment.count({
      where: {
        startTime: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
    }),

    prisma.appointment.count({
      where: {
        startTime: {
          gte: startOfDay(addDays(today, 1)),
          lte: endOfDay(addDays(today, 1)),
        },
      },
    }),

    prisma.appointment.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.appointment.count({
      where: {
        status: "CANCELLED",
        cancelledAt: {
          gte: startOfMonth(today),
          lte: endOfMonth(today),
        },
      },
    }),

    prisma.appointment.count({
      where: {
        status: "NO_SHOW",
      },
    }),

    prisma.appointment.aggregate({
      where: {
        status: "COMPLETED",
        startTime: {
          gte: startOfWeek(today, {
            weekStartsOn: 1,
          }),
          lte: endOfWeek(today, {
            weekStartsOn: 1,
          }),
        },
      },
      _sum: {
        price: true,
      },
    }),

    prisma.appointment.aggregate({
      where: {
        status: "COMPLETED",
        startTime: {
          gte: startOfMonth(today),
          lte: endOfMonth(today),
        },
      },
      _sum: {
        price: true,
      },
    }),

    prisma.appointment.findMany({
      where: {
        status: "PENDING",
      },

      include: {
        customer: true,
        service: true,
      },

      orderBy: {
        startTime: "asc",
      },

      take: 5,
    }),
  ]);

  return {
    todayAppointments,

    tomorrowAppointments,

    pendingAppointments,

    cancelledAppointments,

    noShowAppointments,

    weeklyRevenue: weeklyRevenue._sum.price ?? 0,

    monthlyRevenue: monthlyRevenue._sum.price ?? 0,

    pendingList,
  };
}
