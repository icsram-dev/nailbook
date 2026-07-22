import { prisma } from "@/lib/prisma";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export default async function DashboardPage() {
  const [
    customerCount,
    serviceCount,
    appointmentCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.service.count(),
    prisma.appointment.count(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <DashboardGrid>
        <DashboardCard
          title="Vendégek"
          value={customerCount}
        />

        <DashboardCard
          title="Szolgáltatások"
          value={serviceCount}
        />

        <DashboardCard
          title="Foglalások"
          value={appointmentCount}
        />

        <DashboardCard
          title="Mai bevétel"
          value="0 Ft"
        />
      </DashboardGrid>
    </div>
  );
}