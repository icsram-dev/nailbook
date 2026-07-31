"use client";

import { Vacation } from "@prisma/client";

import { Button } from "@/components/ui/Button";

type VacationTableProps = {
  vacations: Vacation[];
  onDelete: (id: string) => Promise<void>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("hu-HU").format(new Date(date));
}

export function VacationTable({
  vacations,
  onDelete,
}: VacationTableProps) {
  if (vacations.length === 0) {
    return (
      <p className="mt-6 text-center text-gray-500">
        Még nincs rögzített szabadság.
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Kezdő dátum
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Záró dátum
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Megjegyzés
            </th>

            <th className="px-4 py-3 text-right text-sm font-semibold">
              Műveletek
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {vacations.map((vacation) => (
            <tr key={vacation.id}>
              <td className="px-4 py-3">
                {formatDate(vacation.startDate)}
              </td>

              <td className="px-4 py-3">
                {formatDate(vacation.endDate)}
              </td>

              <td className="px-4 py-3">
                {vacation.reason || "-"}
              </td>

              <td className="space-x-2 px-4 py-3 text-right">
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await onDelete(vacation.id);
                  }}
                >
                  Törlés
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}