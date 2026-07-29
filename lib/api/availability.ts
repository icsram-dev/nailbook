export interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface GetAvailabilityParams {
  date: Date;
  serviceId: string;
}

export async function getAvailability({
  date,
  serviceId,
}: GetAvailabilityParams): Promise<TimeSlot[]> {
  const params = new URLSearchParams({
    date: date.toISOString(),
    serviceId,
  });

  const response = await fetch(
    `/api/availability?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Nem sikerült lekérni a szabad időpontokat.");
  }

  return response.json();
}