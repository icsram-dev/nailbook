"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type OpeningHour = {
  id: string;
  weekday: number;
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
};

type Props = {
  openingHours: OpeningHour[];
};

const days = [
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
  "Vasárnap",
];

export default function OpeningHoursForm({
  openingHours,
}: Props) {
  const [hours, setHours] = useState(openingHours);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  function updateHour(
    index: number,
    field: keyof OpeningHour,
    value: string | boolean
  ) {
    const updated = [...hours];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setHours(updated);
  }

  async function handleSubmit() {
    try {
      setIsSaving(true);

      const response = await fetch("/api/admin/opening-hours", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hours),
      });

      if (!response.ok) {
        throw new Error("Sikertelen mentés.");
      }

      router.refresh();

      alert("Nyitvatartás sikeresen mentve!");
    } catch (error) {
      console.error(error);
      alert("Hiba történt a mentés során.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Nap</th>
            <th className="p-4 text-center">Nyitás</th>
            <th className="p-4 text-center">Zárás</th>
            <th className="p-4 text-center">Zárva</th>
          </tr>
        </thead>

        <tbody>
          {hours.map((day, index) => (
            <tr
              key={day.id}
              className="border-t"
            >
              <td className="p-4 font-medium">
                {days[day.weekday - 1]}
              </td>

              <td className="p-4 text-center">
                <input
                  type="time"
                  value={day.opensAt}
                  disabled={day.isClosed}
                  onChange={(e) =>
                    updateHour(index, "opensAt", e.target.value)
                  }
                  className="rounded-lg border p-2"
                />
              </td>

              <td className="p-4 text-center">
                <input
                  type="time"
                  value={day.closesAt}
                  disabled={day.isClosed}
                  onChange={(e) =>
                    updateHour(index, "closesAt", e.target.value)
                  }
                  className="rounded-lg border p-2"
                />
              </td>

              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={day.isClosed}
                  onChange={(e) =>
                    updateHour(index, "isClosed", e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t p-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="rounded-xl bg-pink-600 px-6 py-3 text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Mentés..." : "Mentés"}
        </button>
      </div>
    </div>
  );
}