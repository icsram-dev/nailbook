import { prisma } from "@/lib/prisma";
import TodayAppointments from "@/components/admin/TodayAppointments";
import DashboardCard from "@/components/admin/DashboardCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

import {
  CalendarDays,
  Users,
  Scissors,
  Wallet,
  Banknote,
} from "lucide-react";

import {
  startOfDay,
  endOfDay,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

export default async function AdminPage() {
  const today = new Date();

  const [
    customerCount,
    appointmentCount,
    serviceCount,
    todayAppointments,
    tomorrowAppointments,
    weeklyRevenue,
    monthlyRevenue,
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
  ]);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Áttekintés a mai napról."
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Vendégek"
          value={customerCount}
          icon={<Users size={30} />}
        />

        <DashboardCard
          title="Szolgáltatások"
          value={serviceCount}
          icon={<Scissors size={30} />}
        />

        <DashboardCard
          title="Összes foglalás"
          value={appointmentCount}
          icon={<CalendarDays size={30} />}
        />

        <DashboardCard
          title="Mai foglalások"
          value={todayAppointments}
          icon={<CalendarDays size={30} />}
          color="bg-green-100 text-green-600"
        />

        <DashboardCard
          title="Holnapi foglalások"
          value={tomorrowAppointments}
          icon={<CalendarDays size={30} />}
          color="bg-indigo-100 text-indigo-600"
        />

        <DashboardCard
          title="Heti bevétel"
          value={`${(weeklyRevenue._sum.price ?? 0).toLocaleString(
            "hu-HU"
          )} Ft`}
          icon={<Wallet size={30} />}
          color="bg-emerald-100 text-emerald-600"
        />

        <DashboardCard
          title="Havi bevétel"
          value={`${(monthlyRevenue._sum.price ?? 0).toLocaleString(
            "hu-HU"
          )} Ft`}
          icon={<Banknote size={30} />}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="mt-8">
        <TodayAppointments />
      </div>
    </>
  );
}