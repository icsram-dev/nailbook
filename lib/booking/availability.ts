import { isAfter, isBefore } from "date-fns";

import type { TimeSlot } from "@/types/time-slot";

type Appointment = {
  startTime: Date;
  endTime: Date;
};

type Vacation = {
  startDate: Date;
  endDate: Date;
};

type ApplyAvailabilityOptions = {
  slots: TimeSlot[];
  appointments: Appointment[];
  vacations: Vacation[];
  now?: Date;
};

function overlaps(
  slotStart: Date,
  slotEnd: Date,
  rangeStart: Date,
  rangeEnd: Date
) {
  return slotStart < rangeEnd && slotEnd > rangeStart;
}

export function applyAvailability({
  slots,
  appointments,
  vacations,
  now = new Date(),
}: ApplyAvailabilityOptions): TimeSlot[] {
  return slots.map((slot) => {
    // múltbeli időpont
    if (isBefore(slot.start, now)) {
      return {
        ...slot,
        available: false,
        reason: "PAST",
      };
    }

    // szabadság
    const onVacation = vacations.some((vacation) =>
      overlaps(
        slot.start,
        slot.end,
        vacation.startDate,
        vacation.endDate
      )
    );

    if (onVacation) {
      return {
        ...slot,
        available: false,
        reason: "VACATION",
      };
    }

    // meglévő foglalás
    const booked = appointments.some((appointment) =>
      overlaps(
        slot.start,
        slot.end,
        appointment.startTime,
        appointment.endTime
      )
    );

    if (booked) {
      return {
        ...slot,
        available: false,
        reason: "BOOKED",
      };
    }

    return {
      ...slot,
      available: true,
    };
  });
}