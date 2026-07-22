import { z } from "zod";

export const vacationSchema = z
  .object({
    startDate: z.string().min(1, "A kezdő dátum kötelező."),
    endDate: z.string().min(1, "A befejező dátum kötelező."),
    reason: z.string().max(255).optional(),
  })
  .transform((data) => ({
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    reason: data.reason,
  }))
  .refine(
    (data) => data.startDate <= data.endDate,
    {
      message:
        "A kezdő dátum nem lehet későbbi, mint a befejező dátum.",
      path: ["endDate"],
    }
  );

export type VacationInput = z.input<typeof vacationSchema>;
export type VacationData = z.output<typeof vacationSchema>;