import { prisma } from "@/lib/prisma";
import { VacationTable } from "@/components/vacations/VacationTable";
import { Button } from "@/components/ui/Button";

export default async function VacationsPage() {
  const vacations = await prisma.vacation.findMany({
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Szabadságok
        </h1>

       <Button size="lg">
  + Új szabadság
</Button>
      </div>

      <VacationTable vacations={vacations} />
    </div>
  );
}