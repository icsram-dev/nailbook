import { z } from "zod";

export const appointmentSchema = z.object({
  customerId: z.string().min(1, "A vendég kiválasztása kötelező."),

  serviceId: z.string().min(1, "A szolgáltatás kiválasztása kötelező."),

  date: z.string().min(1, "A dátum megadása kötelező."),

  time: z.string().min(1, "Az időpont megadása kötelező."),

  note: z.string().trim().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
export type AppointmentData = AppointmentFormValues;
