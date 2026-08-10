"use client";

import type { AppointmentWithService } from "@/types/appointment";

import AppointmentStatusBadge from "./AppointmentStatusBadge";
import CancelBookingButton from "@/components/my-bookings/CancelBookingButton";

type AppointmentCardProps = {
  appointment: AppointmentWithService;
};

export default function AppointmentCard({
  appointment,
}: AppointmentCardProps) {
  const start = new Date(appointment.startTime);

  const canCancel =
    ["PENDING", "CONFIRMED"].includes(appointment.status) &&
    start > new Date();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {appointment.service.name}
          </h2>

          {appointment.service.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {appointment.service.description}
            </p>
          )}
        </div>

        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-gray-500">Dátum</p>

          <p className="mt-1 font-semibold">
            {start.toLocaleDateString("hu-HU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Időpont</p>

          <p className="mt-1 font-semibold">
            {start.toLocaleTimeString("hu-HU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Időtartam</p>

          <p className="mt-1 font-semibold">
            {appointment.service.duration} perc
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Ár</p>

          <p className="mt-1 font-semibold">
            {appointment.price.toLocaleString("hu-HU")} Ft
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5">
        <p className="text-sm text-gray-500">Megjegyzés</p>

        <p className="mt-1 text-sm text-gray-700">
          {appointment.customerNote || "Nincs megadva."}
        </p>
      </div>

      {canCancel && (
        <div className="mt-5 flex justify-end">
          <CancelBookingButton appointmentId={appointment.id} />
        </div>
      )}
    </div>
  );
}