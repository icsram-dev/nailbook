import { z } from "zod";

export const appointmentSchema = z.object({
  serviceId: z
    .string()
    .min(1, "A szolgáltatás kiválasztása kötelező."),

  startTime: z.coerce.date(),

  note: z.string().trim().optional(),
});

export type AppointmentInput = z.input<typeof appointmentSchema>;
export type AppointmentData = z.output<typeof appointmentSchema>;