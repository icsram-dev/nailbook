import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";

import {
  getDashboardStats,
  getWeeklyRevenue,
} from "@/lib/dashboard";
import { formatCurrency } from "@/lib/formatters";
import { getGreeting } from "@/lib/greetings";

import { format } from "date-fns";
import { hu } from "date-fns/locale";

import {
  CalendarDays,
  DollarSign,
  Sparkles,
  Users,
} from "lucide-react";

export default async function DashboardPage() {
  const [dashboard, weeklyRevenue] = await Promise.all([
    getDashboardStats(),
    getWeeklyRevenue(),
  ]);

  const {
    customerCount,
    serviceCount,
    todayAppointments,
    todayRevenue,
    upcomingAppointments,
  } = dashboard;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-lg font-medium text-pink-600">
          {getGreeting()}
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          {format(new Date(), "yyyy. MMMM d., EEEE", {
            locale: hu,
          })}
        </p>
      </div>

      <DashboardGrid>
        <DashboardCard
          title="Mai foglalások"
          value={todayAppointments}
          description="Mai időpontok száma"
          icon={CalendarDays}
        />

        <DashboardCard
          title="Mai bevétel"
          value={formatCurrency(todayRevenue._sum.price ?? 0)}
          description="Mai várható bevétel"
          icon={DollarSign}
        />

        <DashboardCard
          title="Vendégek"
          value={customerCount}
          description="Összes regisztrált vendég"
          icon={Users}
        />

        <DashboardCard
          title="Szolgáltatások"
          value={serviceCount}
          description="Elérhető szolgáltatások"
          icon={Sparkles}
        />
      </DashboardGrid>

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingAppointments
          appointments={upcomingAppointments}
        />

        <RevenueChart
          data={weeklyRevenue}
        />
      </div>
    </div>
  );
}