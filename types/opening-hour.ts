import { WeekDay } from "@prisma/client";

export interface OpeningHour {
  id: string;
  day: WeekDay;
  isOpen: boolean;
  opensAt: string | null;
  closesAt: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpeningHourFormData {
  day: WeekDay;
  isOpen: boolean;
  opensAt: string;
  closesAt: string;
}
