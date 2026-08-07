import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "A név legalább 2 karakter legyen.")
      .max(50, "A név legfeljebb 50 karakter lehet."),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Érvénytelen e-mail cím."),

    phone: z
      .string()
      .trim()
      .min(8, "Érvénytelen telefonszám."),

    password: z
      .string()
      .min(8, "A jelszónak legalább 8 karakter hosszúnak kell lennie."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A két jelszó nem egyezik.",
    path: ["confirmPassword"],
  });