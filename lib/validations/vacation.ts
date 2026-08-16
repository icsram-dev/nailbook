import { z } from "zod";

export const vacationSchema = z
  .object({
    startDate: z.coerce.date({
      error: "A kezdő dátum megadása kötelező.",
    }),

    endDate: z.coerce.date({
      error: "A záró dátum megadása kötelező.",
    }),

    reason: z
      .string()
      .trim()
      .max(255, "A megjegyzés legfeljebb 255 karakter lehet.")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "A záró dátum nem lehet korábbi a kezdő dátumnál.",
  });

export type VacationInput = z.input<typeof vacationSchema>;
export type VacationData = z.output<typeof vacationSchema>;
