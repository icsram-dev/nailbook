import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "A szolgáltatás neve legalább 2 karakter legyen.")
    .max(100, "A szolgáltatás neve legfeljebb 100 karakter lehet."),

  description: z
    .string()
    .max(500, "A leírás legfeljebb 500 karakter lehet.")
    .optional(),

  duration: z.coerce
    .number()
    .int("Egész számot adj meg.")
    .min(5, "Minimum 5 perc.")
    .max(480, "Maximum 480 perc."),

  price: z.coerce
    .number()
    .int("Egész számot adj meg.")
    .min(0, "Az ár nem lehet negatív."),

  active: z.boolean(),
});

export type ServiceInput = z.input<typeof serviceSchema>;
export type ServiceData = z.output<typeof serviceSchema>;