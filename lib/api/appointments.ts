import type { AppointmentSchema } from "@/schemas/appointment";
import type { AppointmentWithService } from "@/types/appointment";

export async function createAppointment(
  data: AppointmentSchema
) {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error ??
        "Nem sikerült létrehozni a foglalást."
    );
  }

  return result;
}

export async function getAppointments(): Promise<
  AppointmentWithService[]
> {
  const response = await fetch("/api/appointments");

  if (!response.ok) {
    throw new Error(
      "Nem sikerült lekérni a foglalásokat."
    );
  }

  return response.json();
}

export async function cancelAppointment(id: string) {
  const response = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error ?? "Nem sikerült lemondani a foglalást."
    );
  }

  return result;
}