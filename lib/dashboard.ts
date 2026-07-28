import { prisma } from "@/lib/prisma";
import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export async function getDashboardData() {
  const today = new Date();

  const weekDays = eachDayOfInterval({
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const [
  customerCount,
  appointmentCount,
  serviceCount,
  todayAppointments,
  tomorrowAppointments,
  weeklyRevenue,
  monthlyRevenue,
  nextAppointment,
  services,
] = await Promise.all([
    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.appointment.count(),

    prisma.service.count(),

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

    prisma.appointment.aggregate({
      where: {
        status: "COMPLETED",
        startTime: {
          gte: startOfWeek(today, { weekStartsOn: 1 }),
          lte: endOfWeek(today, { weekStartsOn: 1 }),
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

    

    prisma.appointment.findFirst({
      where: {
        startTime: {
          gte: today,
        },
        status: "CONFIRMED",
      },
      include: {
        customer: true,
        service: true,
      },
      orderBy: {
        startTime: "asc",
      },
    }),

    prisma.service.findMany({
  include: {
    appointments: {
      where: {
        status: "COMPLETED",
      },
    },
  },
}),
  ]);

  

  const weeklyChart = await Promise.all(
    weekDays.map(async (day) => {
      const revenue = await prisma.appointment.aggregate({
        where: {
          status: "COMPLETED",
          startTime: {
            gte: startOfDay(day),
            lte: endOfDay(day),
          },
        },
        _sum: {
          price: true,
        },
      });

      

      return {
        day: format(day, "EEEEE"),
        revenue: revenue._sum.price ?? 0,
      };
    })
  );

  const topServices = services
  .map((service) => ({
    id: service.id,
    name: service.name,
    bookings: service.appointments.length,
  }))
  .sort((a, b) => b.bookings - a.bookings)
  .slice(0, 5);

 return {
  customerCount,
  appointmentCount,
  serviceCount,
  todayAppointments,
  tomorrowAppointments,
  weeklyRevenue: weeklyRevenue._sum.price ?? 0,
  monthlyRevenue: monthlyRevenue._sum.price ?? 0,
  weeklyChart,
  nextAppointment,
  topServices,
};
}