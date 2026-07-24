"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OpeningHour } from "@prisma/client";
import { toast } from "sonner";

import { WEEKDAYS } from "@/lib/weekdays";

type OpeningHoursFormProps = {
  openingHours: OpeningHour[];
};

export function OpeningHoursForm({
  openingHours,
}: OpeningHoursFormProps) {
  const [days, setDays] = useState<OpeningHour[]>(openingHours);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  async function handleSave() {
    try {
      setIsSaving(true);

      const response = await fetch("/api/opening-hours", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(days),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Nyitvatartás sikeresen mentve.");

      router.refresh();
    } catch {
      toast.error("Nem sikerült menteni a nyitvatartást.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">Nap</th>
            <th className="px-6 py-4 text-center">Nyitva</th>
            <th className="px-6 py-4 text-center">Nyitás</th>
            <th className="px-6 py-4 text-center">Zárás</th>
          </tr>
        </thead>

        <tbody>
          {days.map((day) => (
            <tr
              key={day.id}
              className="border-b last:border-none"
            >
              <td className="px-6 py-4 font-medium">
                {WEEKDAYS[day.weekday]}
              </td>

              <td className="px-6 py-4 text-center">
                <input
                  type="checkbox"
                  checked={day.isOpen}
                  onChange={(e) =>
                    setDays((prev) =>
                      prev.map((item) =>
                        item.id === day.id
                          ? {
                              ...item,
                              isOpen: e.target.checked,
                            }
                          : item
                      )
                    )
                  }
                  className="h-5 w-5 cursor-pointer"
                />
              </td>

              <td className="px-6 py-4 text-center">
                <input
                  type="time"
                  value={day.opensAt}
                  disabled={!day.isOpen}
                  onChange={(e) =>
                    setDays((prev) =>
                      prev.map((item) =>
                        item.id === day.id
                          ? {
                              ...item,
                              opensAt: e.target.value,
                            }
                          : item
                      )
                    )
                  }
                  className="rounded-lg border px-3 py-2 disabled:bg-gray-100 disabled:text-gray-400"
                />
              </td>

              <td className="px-6 py-4 text-center">
                <input
                  type="time"
                  value={day.closesAt}
                  disabled={!day.isOpen}
                  onChange={(e) =>
                    setDays((prev) =>
                      prev.map((item) =>
                        item.id === day.id
                          ? {
                              ...item,
                              closesAt: e.target.value,
                            }
                          : item
                      )
                    )
                  }
                  className="rounded-lg border px-3 py-2 disabled:bg-gray-100 disabled:text-gray-400"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end border-t p-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-lg bg-pink-600 px-6 py-2 font-medium text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Mentés..." : "Változtatások mentése"}
        </button>
      </div>
    </div>
  );
}