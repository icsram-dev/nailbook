import { z } from "zod";

export const customerSchema = z.object({
  lastName: z
    .string()
    .trim()
    .min(2, "A vezetéknév legalább 2 karakter legyen.")
    .max(30, "A vezetéknév legfeljebb 30 karakter lehet."),

  firstName: z
    .string()
    .trim()
    .min(2, "A keresztnév legalább 2 karakter legyen.")
    .max(30, "A keresztnév legfeljebb 30 karakter lehet."),

  email: z
    .string()
    .trim()
    .email("Érvényes e-mail címet adj meg."),

  phone: z
    .string()
    .trim()
    .min(8, "Adj meg egy telefonszámot."),
});

export type CustomerInput = z.input<typeof customerSchema>;
export type CustomerData = z.output<typeof customerSchema>;