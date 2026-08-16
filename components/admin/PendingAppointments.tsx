"use client";

import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Appointment = {
  id: string;
  startTime: Date;
  customer: { firstName: string; lastName: string };
  service: { name: string };
};

type Props = { appointments: Appointment[] };

export default function PendingAppointments({ appointments }: Props) {
  const router = useRouter();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function confirmAppointment(id: string) {
    setConfirmingId(id);
    setError("");
    try {
      const response = await fetch(`/api/admin/appointments/${id}/confirm`, { method: "PATCH" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Nem sikerült jóváhagyni a foglalást.");
      }
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Nem sikerült jóváhagyni a foglalást.");
    } finally {
      setConfirmingId(null);
    }
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-[#fffdfa] p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Foglalások</p>
          <h2 className="mt-2 font-serif text-2xl text-stone-800">Jóváhagyásra várók</h2>
        </div>
        <Link
          href="/admin/calendar"
          className="text-sm font-medium text-[#8f6252] transition hover:underline"
        >
          Naptár megnyitása
        </Link>
      </div>
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {appointments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 p-10 text-center text-sm text-stone-500">
          Nincs jóváhagyásra váró foglalás.
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <article
              key={appointment.id}
              className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-serif text-xl text-stone-800">
                  {appointment.customer.lastName} {appointment.customer.firstName}
                </h3>
                <p className="mt-1 text-sm text-stone-600">{appointment.service.name}</p>
                <p className="mt-2 text-sm text-stone-500">
                  {new Date(appointment.startTime).toLocaleString("hu-HU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => confirmAppointment(appointment.id)}
                disabled={confirmingId !== null}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#a97967] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#8f6252] disabled:opacity-60"
              >
                {confirmingId === appointment.id ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Jóváhagyás...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Jóváhagyás
                  </>
                )}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
