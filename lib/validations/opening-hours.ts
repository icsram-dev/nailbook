import { z } from "zod";

export const openingHourSchema = z
  .object({
    id: z.string(),
    weekday: z.number().min(1).max(7),
    opensAt: z.string(),
    closesAt: z.string(),
    isClosed: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isClosed) {
        return true;
      }

      return data.opensAt < data.closesAt;
    },
    {
      message: "A nyitási időnek korábbinak kell lennie, mint a zárási idő.",
      path: ["closesAt"],
    }
  );

export const updateOpeningHoursSchema = z.array(openingHourSchema);

export type UpdateOpeningHoursInput = z.infer<
  typeof updateOpeningHoursSchema
>;