import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { VacationManager } from "@/components/admin/VacationManager";
import { prisma } from "@/lib/prisma";

export default async function VacationsPage() {
  const vacations = await prisma.vacation.findMany({
    orderBy: {
      startDate: "desc",
    },
  });

  return (
    <>
      <AdminPageHeader title="Szabadságok" description="A szabadságok kezelése." />

      <VacationManager vacations={vacations} />
    </>
  );
}
