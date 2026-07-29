import type { AppointmentSchema } from "@/schemas/appointment";

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
      result.error ?? "Nem sikerült létrehozni a foglalást."
    );
  }

  return result;
}

export async function getAppointments() {
  const response = await fetch("/api/appointments");

  if (!response.ok) {
    throw new Error("Nem sikerült lekérni a foglalásokat.");
  }

  return response.json();
}