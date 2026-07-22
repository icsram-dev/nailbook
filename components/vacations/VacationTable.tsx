import { Vacation } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type VacationTableProps = {
  vacations: Vacation[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (vacation: Vacation) => void;
};

export function VacationTable({
  vacations,
  onDelete,
  onEdit,
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
  onClick={() => onEdit(vacation)}
>
  Szerkesztés
</Button>

<Button
  variant="danger"
  onClick={() => onDelete(vacation.id)}
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