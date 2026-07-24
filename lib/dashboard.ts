import { prisma } from "@/lib/prisma";
import {
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
  format,
  startOfDay,
  startOfWeek,
} from "date-fns";

export async function getDashboardStats() {
  const now = new Date();

  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const [
    customerCount,
    serviceCount,
    todayAppointments,
    todayRevenue,
    upcomingAppointments,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.service.count(),

    prisma.appointment.count({
      where: {
        startTime: {
          gte: todayStart,
          lte: todayEnd,
        },
        status: {
          not: "CANCELLED",
        },
      },
    }),

    prisma.appointment.aggregate({
      where: {
        startTime: {
          gte: todayStart,
          lte: todayEnd,
        },
        status: {
          not: "CANCELLED",
        },
      },
      _sum: {
        price: true,
      },
    }),

    prisma.appointment.findMany({
      where: {
        startTime: {
          gte: now,
        },
        status: {
          not: "CANCELLED",
        },
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
    customerCount,
    serviceCount,
    todayAppointments,
    todayRevenue,
    upcomingAppointments,
  };
}

export async function getWeeklyRevenue() {
  const start = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });

  const end = endOfWeek(new Date(), {
    weekStartsOn: 1,
  });

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: start,
        lte: end,
      },
      status: {
        not: "CANCELLED",
      },
    },
    select: {
      startTime: true,
      price: true,
    },
  });

  const days = eachDayOfInterval({
    start,
    end,
  });

  return days.map((day) => {
    const revenue = appointments
      .filter(
        (appointment) =>
          format(appointment.startTime, "yyyy-MM-dd") ===
          format(day, "yyyy-MM-dd")
      )
      .reduce(
        (sum, appointment) => sum + appointment.price,
        0
      );

    return {
      day: format(day, "EEE"),
      revenue,
    };
  });
}