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
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Mai foglalások"
          value={dashboard.todayAppointments}
          icon={<CalendarDays size={22} />}
          color="bg-[#e7f1e8] text-[#5d8364]"
          href="/admin/calendar"
        />

        <DashboardCard
          title="Holnapi foglalások"
          value={dashboard.tomorrowAppointments}
          icon={<CalendarDays size={22} />}
          color="bg-[#e9edf5] text-[#64728f]"
          href="/admin/calendar"
        />

        <DashboardCard
          title="Jóváhagyásra vár"
          value={dashboard.pendingAppointments}
          icon={<Clock3 size={22} />}
          color="bg-[#f6edcf] text-[#9a7630]"
          href="/admin/calendar?status=pending"
        />

        <DashboardCard
          title="Heti bevétel"
          value={`${dashboard.weeklyRevenue.toLocaleString(
            "hu-HU"
          )} Ft`}
          icon={<Wallet size={22} />}
          color="bg-[#e4f0ea] text-[#5b826b]"
        />

        <DashboardCard
          title="Havi bevétel"
          value={`${dashboard.monthlyRevenue.toLocaleString(
            "hu-HU"
          )} Ft`}
          icon={<Banknote size={22} />}
          color="bg-[#f7efdc] text-[#96713b]"
        />

        <DashboardCard
          title="Lemondások"
          value={dashboard.cancelledAppointments}
          icon={<CircleX size={22} />}
          color="bg-[#f6e8e5] text-[#a36a5d]"
          href="/admin/calendar?status=CANCELLED"
        />

        <DashboardCard
          title="Nem jelentek meg"
          value={dashboard.noShowAppointments}
          icon={<UserX size={22} />}
          color="bg-[#f8eadf] text-[#a46c4f]"
          href="/admin/calendar?status=NO_SHOW"
        />
      </div>

      <div className="mt-8">
        <PendingAppointments
          appointments={dashboard.pendingList}
        />
      </div>
    </>
  );
}
