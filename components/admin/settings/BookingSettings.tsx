"use client";

import { useState } from "react";

import SettingsCard from "./SettingsCard";

type Props = {
  settings: {
    autoConfirmBookings: boolean;
    cancellationHours: number;
  };
};

export default function BookingSettings({ settings }: Props) {
  const [autoConfirmBookings, setAutoConfirmBookings] = useState(settings.autoConfirmBookings);

  const [cancellationHours, setCancellationHours] = useState(settings.cancellationHours);

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/settings/booking", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autoConfirmBookings,
          cancellationHours,
        }),
      });

      if (!res.ok) {
        const data = await res.json();

        throw new Error(data.error ?? "Nem sikerült menteni a beállításokat.");
      }

      alert("Beállítások sikeresen mentve.");
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Hiba történt a mentés során.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsCard
      title="📅 Foglalási beállítások"
      description="A foglalások működésének konfigurálása."
    >
      <div className="space-y-6">
        <label className="flex items-start justify-between gap-6 rounded-2xl bg-[#f8f5f1] p-5">
          <div>
            <h3 className="font-medium text-stone-800">Automatikus jóváhagyás</h3>

            <p className="mt-1 text-sm leading-6 text-stone-600">
              Az új foglalások automatikusan megerősítésre kerülnek.
            </p>
          </div>

          <input
            type="checkbox"
            checked={autoConfirmBookings}
            onChange={(e) => setAutoConfirmBookings(e.target.checked)}
            disabled={loading}
            className="mt-1 h-5 w-5 accent-[#a97967] disabled:opacity-50"
          />
        </label>

        <div>
          <label htmlFor="cancellationHours" className="mb-2 block font-medium">
            Lemondási határidő (óra)
          </label>

          <input
            id="cancellationHours"
            type="number"
            min={0}
            max={168}
            value={cancellationHours}
            onChange={(e) => {
              const value = Number(e.target.value);

              setCancellationHours(Number.isNaN(value) ? 0 : value);
            }}
            disabled={loading}
            className="w-full max-w-40 rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2] disabled:bg-stone-100 disabled:text-stone-500"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="rounded-full bg-[#a97967] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8f6252] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Mentés..." : "Mentés"}
        </button>
      </div>
    </SettingsCard>
  );
}
