import { format } from "date-fns";
export interface TimeSlot { start: string; end: string; available: boolean; }
interface GetAvailabilityParams { date: Date; serviceId: string; }
export async function getAvailability({ date, serviceId }: GetAvailabilityParams): Promise<TimeSlot[]> { const params = new URLSearchParams({ date: format(date, "yyyy-MM-dd"), serviceId }); const response = await fetch(`/api/availability?${params.toString()}`); if (!response.ok) throw new Error("Nem sikerült lekérni a szabad időpontokat."); return response.json(); }
