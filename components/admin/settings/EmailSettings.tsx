"use client";

import { useState } from "react";

import SettingsCard from "./SettingsCard";

type Props = {
  settings: {
    emailNotifications: boolean;
  };
};

export default function EmailSettings({ settings }: Props) {
  const [emailNotifications, setEmailNotifications] = useState(settings.emailNotifications);

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/settings/email", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailNotifications,
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
      title="📧 E-mail értesítések"
      description="Az automatikus e-mail értesítések kezelése."
    >
      <div className="space-y-6">
        <label className="flex items-start justify-between gap-6 rounded-2xl bg-[#f8f5f1] p-5">
          <div>
            <h3 className="font-medium text-stone-800">E-mail értesítések</h3>

            <p className="mt-1 text-sm leading-6 text-stone-600">
              Foglaláskor, módosításkor és lemondáskor küldjön a rendszer automatikus e-mailt.
            </p>
          </div>

          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            disabled={loading}
            className="mt-1 h-5 w-5 accent-[#a97967] disabled:opacity-50"
          />
        </label>

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
