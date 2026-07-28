import TodayAppointments from "@/components/admin/TodayAppointments";
import DashboardCard from "@/components/admin/DashboardCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import WeeklyRevenueChart from "@/components/admin/WeeklyRevenueChart";
import { getDashboardData } from "@/lib/dashboard";
import NextAppointmentCard from "@/components/admin/NextAppointmentCard";
import TopServicesCard from "@/components/admin/TopServicesCard";

import {
  CalendarDays,
  Users,
  Scissors,
  Wallet,
  Banknote,
} from "lucide-react";

export default async function AdminPage() {
  const dashboard = await getDashboardData();

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Áttekintés a mai napról."
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Vendégek"
          value={dashboard.customerCount}
          icon={<Users size={30} />}
        />

        <DashboardCard
          title="Szolgáltatások"
          value={dashboard.serviceCount}
          icon={<Scissors size={30} />}
        />

        <DashboardCard
          title="Összes foglalás"
          value={dashboard.appointmentCount}
          icon={<CalendarDays size={30} />}
        />

        <DashboardCard
          title="Mai foglalások"
          value={dashboard.todayAppointments}
          icon={<CalendarDays size={30} />}
          color="bg-green-100 text-green-600"
        />

        <DashboardCard
          title="Holnapi foglalások"
          value={dashboard.tomorrowAppointments}
          icon={<CalendarDays size={30} />}
          color="bg-indigo-100 text-indigo-600"
        />

        <DashboardCard
          title="Heti bevétel"
          value={`${dashboard.weeklyRevenue.toLocaleString("hu-HU")} Ft`}
          icon={<Wallet size={30} />}
          color="bg-emerald-100 text-emerald-600"
        />

        <DashboardCard
          title="Havi bevétel"
          value={`${dashboard.monthlyRevenue.toLocaleString("hu-HU")} Ft`}
          icon={<Banknote size={30} />}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="mt-8">
        <WeeklyRevenueChart data={dashboard.weeklyChart} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
  <NextAppointmentCard appointment={dashboard.nextAppointment} />

  <TodayAppointments />
</div>
<div className="mt-8">
  <TopServicesCard services={dashboard.topServices} />
</div>

      
    </>
  );
}