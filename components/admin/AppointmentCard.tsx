"use client";

import Button from "@/components/ui/Button";

type Props = {
  appointment: {
    id: string;
    status: string;
    customer: {
      name: string;
      email: string;
    };
    service: {
      name: string;
    };
    startTime: Date;
    price: number;
  };
};

export default function AppointmentCard({
  appointment,
}: Props) {
  async function confirmAppointment() {
    const response = await fetch(
      `/api/appointments/${appointment.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "CONFIRMED",
        }),
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Nem sikerült frissíteni a foglalást.");
    }
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {appointment.customer.name}
        </h2>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
          {appointment.status}
        </span>
      </div>

      <p className="mt-1 text-gray-600">
        {appointment.customer.email}
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          💅 <strong>Szolgáltatás:</strong> {appointment.service.name}
        </p>

        <p>
          📅 <strong>Dátum:</strong>{" "}
          {new Date(appointment.startTime).toLocaleDateString("hu-HU")}
        </p>

        <p>
          🕒 <strong>Időpont:</strong>{" "}
          {new Date(appointment.startTime).toLocaleTimeString("hu-HU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p>
          💰 <strong>Ár:</strong>{" "}
          {appointment.price.toLocaleString("hu-HU")} Ft
        </p>
      </div>

      {appointment.status === "PENDING" && (
        <div className="mt-6">
          <Button
            type="button"
            onClick={confirmAppointment}
          >
            Foglalás megerősítése
          </Button>
        </div>
      )}
    </div>
  );
}