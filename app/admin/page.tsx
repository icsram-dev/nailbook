import DashboardCard from "@/components/admin/DashboardCard";
import PendingAppointments from "@/components/admin/PendingAppointments";
import { getDashboardData } from "@/lib/dashboard";

import {
  CalendarDays,
  Wallet,
  Banknote,
  Clock3,
  CircleX,
  UserX,
} from "lucide-react";

export default async function AdminPage() {
  const dashboard = await getDashboardData();

  return (
    <>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Mai foglalások"
          value={dashboard.todayAppointments}
          icon={<CalendarDays size={30} />}
          color="bg-green-100 text-green-600"
          href="/admin/calendar"
        />

        <DashboardCard
          title="Holnapi foglalások"
          value={dashboard.tomorrowAppointments}
          icon={<CalendarDays size={30} />}
          color="bg-indigo-100 text-indigo-600"
          href="/admin/calendar"
        />

        <DashboardCard
          title="Jóváhagyásra vár"
          value={dashboard.pendingAppointments}
          icon={<Clock3 size={30} />}
          color="bg-amber-100 text-amber-600"
          href="/admin/calendar?status=pending"
        />

        <DashboardCard
          title="Heti bevétel"
          value={`${dashboard.weeklyRevenue.toLocaleString(
            "hu-HU"
          )} Ft`}
          icon={<Wallet size={30} />}
          color="bg-emerald-100 text-emerald-600"
        />

        <DashboardCard
          title="Havi bevétel"
          value={`${dashboard.monthlyRevenue.toLocaleString(
            "hu-HU"
          )} Ft`}
          icon={<Banknote size={30} />}
          color="bg-yellow-100 text-yellow-600"
        />

        <DashboardCard
          title="Lemondások"
          value={dashboard.cancelledAppointments}
          icon={<CircleX size={30} />}
          color="bg-red-100 text-red-600"
          href="/admin/calendar?status=CANCELLED"
        />

        <DashboardCard
          title="Nem jelentek meg"
          value={dashboard.noShowAppointments}
          icon={<UserX size={30} />}
          color="bg-orange-100 text-orange-600"
          href="/admin/calendar?status=NO_SHOW"
        />
      </div>

      <div className="mt-10">
        <PendingAppointments
          appointments={dashboard.pendingList}
        />
      </div>
    </>
  );
}