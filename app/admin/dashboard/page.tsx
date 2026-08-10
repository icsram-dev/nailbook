import DashboardCard from "@/components/admin/DashboardCard";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";

import { getDashboardData } from "@/lib/dashboard";

import { format } from "date-fns";
import { hu } from "date-fns/locale";

import {
  CalendarDays,
  DollarSign,
  Sparkles,
  Users,
} from "lucide-react";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-lg font-medium text-pink-600">
          Üdvözöllek!
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
          value={dashboard.todayAppointments}
          icon={<CalendarDays />}
        />

        <DashboardCard
          title="Mai bevétel"
          value={`${dashboard.weeklyRevenue.toLocaleString("hu-HU")} Ft`}
          icon={<DollarSign />}
        />

        <DashboardCard
          title="Vendégek"
          value={dashboard.pendingAppointments}
          icon={<Users />}
        />

        <DashboardCard
          title="Szolgáltatások"
          value={dashboard.cancelledAppointments}
          icon={<Sparkles />}
        />
      </DashboardGrid>

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingAppointments />

        <RevenueChart
          data={[]}
        />
      </div>
    </div>
  );
}
