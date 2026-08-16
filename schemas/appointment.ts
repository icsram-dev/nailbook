import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const appointmentSchema = z.object({
  serviceId: z.string().cuid(),

  startTime: z.coerce.date(),

  note: z.string().trim().optional(),

  status: z.nativeEnum(AppointmentStatus).optional(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
