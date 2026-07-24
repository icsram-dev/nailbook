import { Appointment, Service, User } from "@prisma/client";

export type AppointmentWithRelations = Appointment & {
  customer: User;
  service: Service;
};