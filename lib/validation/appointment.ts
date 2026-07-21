import { z } from "zod";

export const appointmentSchema = z.object({
  customerId: z.string().min(1, "Válassz vendéget."),
  serviceId: z.string().min(1, "Válassz szolgáltatást."),
  date: z.string().min(1, "Adj meg dátumot."),
  time: z.string().min(1, "Adj meg időpontot."),
  note: z.string().optional(),
});

export type AppointmentFormValues = z.infer<
  typeof appointmentSchema
>;