import { z } from "zod";

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Válassz szolgáltatást."),

  date: z.date({
    error: "Válassz dátumot.",
  }),

  slot: z.string().min(1, "Válassz időpontot."),

  note: z.string().trim().optional(),
});

export type BookingFormValues = z.input<typeof bookingSchema>;
export type BookingSchema = z.output<typeof bookingSchema>;