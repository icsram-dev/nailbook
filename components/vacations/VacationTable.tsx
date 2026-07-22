import { Vacation } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type VacationTableProps = {
  vacations: Vacation[];
};

export function VacationTable({
  vacations,
}: VacationTableProps) {
  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead className="bg-neutral-100">
          <tr>
            <th className="px-4 py-3 text-left">Kezdete</th>
            <th className="px-4 py-3 text-left">Vége</th>
            <th className="px-4 py-3 text-left">Megjegyzés</th>
            <th className="px-4 py-3 text-right">Műveletek</th>
          </tr>
        </thead>

        <tbody>
          {vacations.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-neutral-500"
              >
                Még nincs rögzített szabadság.
              </td>
            </tr>
          ) : (
            vacations.map((vacation) => (
              <tr
                key={vacation.id}
                className="border-t"
              >
                <td className="px-4 py-3">
                  {vacation.startDate.toLocaleDateString("hu-HU")}
                </td>

                <td className="px-4 py-3">
                  {vacation.endDate.toLocaleDateString("hu-HU")}
                </td>

                <td className="px-4 py-3">
                  {vacation.reason || "-"}
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                 <Button
  variant="secondary"
  size="sm"
>
  Szerkesztés
</Button>

<Button
  variant="danger"
  size="sm"
>
  Törlés
</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
}