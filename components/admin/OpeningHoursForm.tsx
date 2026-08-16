"use client";

import { useState, useTransition } from "react";
import { WeekDay } from "@prisma/client";
import { useRouter } from "next/navigation";

import { updateOpeningHours } from "@/app/admin/opening-hours/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OpeningHour } from "@/types/opening-hour";

interface OpeningHoursFormProps {
  openingHours: OpeningHour[];
}

const dayLabels: Record<WeekDay, string> = {
  MONDAY: "Hétfő",
  TUESDAY: "Kedd",
  WEDNESDAY: "Szerda",
  THURSDAY: "Csütörtök",
  FRIDAY: "Péntek",
  SATURDAY: "Szombat",
  SUNDAY: "Vasárnap",
};

export default function OpeningHoursForm({ openingHours }: OpeningHoursFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [rows, setRows] = useState(
    openingHours.map((item) => ({
      day: item.day,
      isOpen: item.isOpen,
      opensAt: item.opensAt,
      closesAt: item.closesAt,
    }))
  );

  function updateRow(
    index: number,
    field: "isOpen" | "opensAt" | "closesAt",
    value: boolean | string | null
  ) {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  }

  function handleSubmit() {
    startTransition(async () => {
      try {
        await updateOpeningHours(rows);

        router.refresh();

        alert("A nyitvatartás sikeresen mentve.");
      } catch (error) {
        console.error(error);

        alert("Nem sikerült elmenteni a nyitvatartást.");
      }
    });
  }

  return (
    <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">Nap</th>
              <th className="py-3 text-left">Nyitás</th>
              <th className="py-3 text-left">Zárás</th>
              <th className="py-3 text-center">Nyitva</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row.day} className="border-b last:border-none">
                <td className="py-3 font-medium">{dayLabels[row.day]}</td>

                <td className="py-3 pr-4">
                  <Input
                    type="time"
                    value={row.opensAt ?? ""}
                    disabled={!row.isOpen}
                    onChange={(e) => updateRow(index, "opensAt", e.target.value || null)}
                  />
                </td>

                <td className="py-3 pr-4">
                  <Input
                    type="time"
                    value={row.closesAt ?? ""}
                    disabled={!row.isOpen}
                    onChange={(e) => updateRow(index, "closesAt", e.target.value || null)}
                  />
                </td>

                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    checked={row.isOpen}
                    onChange={(e) => updateRow(index, "isOpen", e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Mentés..." : "Mentés"}
        </Button>
      </div>
    </div>
  );
}
