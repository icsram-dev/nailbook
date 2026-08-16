"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppointmentStatus } from "@prisma/client";

import AppointmentStatusBadge from "../AppointmentStatusBadge";

type Appointment = {
  id: string;
  startTime: Date;
  price: number;
  status: AppointmentStatus;
  service: {
    name: string;
    duration: number;
  };
};

type Props = {
  customerId: string;
  appointments: Appointment[];
};

export default function AppointmentHistory({ customerId, appointments }: Props) {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const allSelected = appointments.length > 0 && selectedIds.length === appointments.length;

  function toggleAppointment(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(appointments.map((appointment) => appointment.id));
    }
  }

  async function deleteSelected() {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Biztosan törölni szeretnéd a kijelölt ${selectedIds.length} foglalást? A törlés végleges.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/customers/${customerId}/appointments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentIds: selectedIds,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Nem sikerült törölni a foglalásokat.");
      }

      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Nem sikerült törölni a foglalásokat.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Foglalási előzmények</h2>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={deleteSelected}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Törlés..." : `Kijelöltek törlése (${selectedIds.length})`}
          </button>
        )}
      </div>

      {appointments.length === 0 ? (
        <p className="px-6 py-8 text-center text-gray-500">Még nincs foglalás.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Összes foglalás kijelölése"
                    className="h-4 w-4 rounded"
                  />
                </th>

                <th className="px-6 py-4">Dátum</th>
                <th className="px-6 py-4">Szolgáltatás</th>
                <th className="px-6 py-4">Időtartam</th>
                <th className="px-6 py-4">Ár</th>
                <th className="px-6 py-4">Státusz</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className={`border-b last:border-0 ${
                    selectedIds.includes(appointment.id) ? "bg-pink-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(appointment.id)}
                      onChange={() => toggleAppointment(appointment.id)}
                      aria-label={`${appointment.service.name} kijelölése`}
                      className="h-4 w-4 rounded"
                    />
                  </td>

                  <td className="px-6 py-4">{appointment.startTime.toLocaleString("hu-HU")}</td>

                  <td className="px-6 py-4 font-medium">{appointment.service.name}</td>

                  <td className="px-6 py-4">{appointment.service.duration} perc</td>

                  <td className="px-6 py-4">{appointment.price.toLocaleString("hu-HU")} Ft</td>

                  <td className="px-6 py-4">
                    <AppointmentStatusBadge status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
