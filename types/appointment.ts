import { AppointmentStatus, Service } from "@prisma/client";

export type AppointmentWithService = {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  status: AppointmentStatus;
  customerNote: string | null;
  createdAt: string;
  updatedAt: string;
  service: Pick<Service, "id" | "name" | "description" | "duration" | "price">;
};
