import { isBefore } from "date-fns";

import { BOOKING_CONFIG } from "@/config/booking";
import {
  addMinutesToDate,
  combineDateAndTime,
} from "@/lib/booking/date-utils";

import type { TimeSlot } from "@/types/time-slot";

type GenerateTimeSlotsOptions = {
  date: Date;
  openingTime: string;
  closingTime: string;
  serviceDuration: number;
};

export function generateTimeSlots({
  date,
  openingTime,
  closingTime,
  serviceDuration,
}: GenerateTimeSlotsOptions): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const opening = combineDateAndTime(
    date,
    openingTime
  );

  const closing = combineDateAndTime(
    date,
    closingTime
  );

  let current = opening;

  while (true) {
    const end = addMinutesToDate(
      current,
      serviceDuration
    );

    if (end > closing) {
      break;
    }

    slots.push({
      start: current,
      end,
      available: true,
    });

    current = addMinutesToDate(
      current,
      BOOKING_CONFIG.SLOT_INTERVAL_MINUTES
    );

    if (!isBefore(current, closing)) {
      break;
    }
  }

  return slots;
}