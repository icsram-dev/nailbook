import { prisma } from "@/lib/prisma";
import {
  CalendarDays,
  Users,
  Wallet,
  Clock,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default async function DashboardPage() {
  const today = new Date();

  // Mai nap kezdete és vége
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // Aktuális hónap kezdete és vége
  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const [
    customerCount,
    pendingAppointments,
    todayAppointments,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.appointment.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.appointment.count({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    }),

    prisma.appointment.aggregate({
      _sum: {
        price: true,
      },
      where: {
        status: "COMPLETED",
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Üdv újra! 👋
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Mai időpontok"
          value={todayAppointments}
          icon={<CalendarDays size={28} />}
        />

        <StatCard
          title="Vendégek"
          value={customerCount}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Havi bevétel"
          value={`${(monthlyRevenue._sum.price ?? 0).toLocaleString("hu-HU")} Ft`}
          icon={<Wallet size={28} />}
        />

        <StatCard
          title="Függő foglalások"
          value={pendingAppointments}
          icon={<Clock size={28} />}
        />
      </div>

      <UpcomingAppointments />
      <div className="grid gap-6 lg:grid-cols-2">
  <UpcomingAppointments />
  <QuickActions />
</div>
    </div>
  );
}