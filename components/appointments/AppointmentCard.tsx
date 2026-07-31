import type { AppointmentWithService } from "@/types/appointment";

import AppointmentStatusBadge from "./AppointmentStatusBadge";

type AppointmentCardProps = {
  appointment: AppointmentWithService;
};

export default function AppointmentCard({
  appointment,
}: AppointmentCardProps) {
  const start = new Date(appointment.startTime);

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {appointment.service.name}
          </h2>

          {appointment.service.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {appointment.service.description}
            </p>
          )}
        </div>

        <AppointmentStatusBadge
          status={appointment.status}
        />
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <p>
          <span className="font-medium">Dátum:</span>{" "}
          {start.toLocaleDateString("hu-HU")}
        </p>

        <p>
          <span className="font-medium">Időpont:</span>{" "}
          {start.toLocaleTimeString("hu-HU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p>
          <span className="font-medium">
            Időtartam:
          </span>{" "}
          {appointment.service.duration} perc
        </p>

        <p>
          <span className="font-medium">Ár:</span>{" "}
          {appointment.price.toLocaleString("hu-HU")} Ft
        </p>

        <p>
          <span className="font-medium">
            Megjegyzés:
          </span>{" "}
          {appointment.customerNote ??
            "Nincs megadva."}
        </p>
      </div>
    </div>
  );
}