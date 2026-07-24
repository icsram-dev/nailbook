import { z } from "zod";

export const openingHourSchema = z.object({
  id: z.string().cuid(),
  weekday: z.number().int().min(1).max(7),
  isOpen: z.boolean(),
  opensAt: z.string(),
  closesAt: z.string(),
});

export const openingHoursSchema = z.array(openingHourSchema);