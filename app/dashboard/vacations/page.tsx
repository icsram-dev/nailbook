import { prisma } from "@/lib/prisma";
import { VacationManager } from "@/components/vacations/VacationManager";

export default async function VacationsPage() {
  const vacations = await prisma.vacation.findMany({
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <VacationManager vacations={vacations} />
    </div>
  );
}