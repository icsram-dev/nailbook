import { prisma } from "@/lib/prisma";
import TodayAppointments from "@/components/admin/TodayAppointments";
import DashboardCard from "@/components/admin/DashboardCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
  CalendarDays,
  Users,
  Scissors,
} from "lucide-react";

export default async function AdminPage() {
  const customerCount = await prisma.user.count({
    where: {
      role: "CUSTOMER",
    },
  });

  const appointmentCount =
    await prisma.appointment.count();

  const serviceCount =
    await prisma.service.count();

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard
          title="Foglalások"
          value={appointmentCount}
          icon={<CalendarDays size={30} />}
        />

        <DashboardCard
          title="Vendégek"
          value={customerCount}
          icon={<Users size={30} />}
          color="bg-blue-100 text-blue-600"
        />

        <DashboardCard
          title="Szolgáltatások"
          value={serviceCount}
          icon={<Scissors size={30} />}
          color="bg-green-100 text-green-600"

          
        />
        <AdminPageHeader
  title="Dashboard"
  description="Áttekintés a mai napról."
/>
      </div>
      <TodayAppointments />
    </>
  );
}