import { z } from "zod";

export const vacationSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    reason: z.string().max(255).optional(),
  })
  .refine(
    (data) => data.startDate <= data.endDate,
    {
      message: "A kezdő dátum nem lehet későbbi, mint a befejező dátum.",
      path: ["endDate"],
    }
  );

export type VacationInput = z.infer<typeof vacationSchema>;