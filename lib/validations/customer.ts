import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "A név legalább 2 karakter legyen.")
    .max(100, "A név legfeljebb 100 karakter lehet."),

  email: z
    .string()
    .trim()
    .email("Érvényes e-mail címet adj meg."),

  phone: z
    .string()
    .trim()
    .optional(),
});

export type CustomerInput = z.input<typeof customerSchema>;
export type CustomerData = z.output<typeof customerSchema>;