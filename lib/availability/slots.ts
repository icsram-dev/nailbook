import { TimeSlot } from "./types";

export function generateTimeSlots(
  openingDate: Date,
  closingDate: Date,
  duration: number,
  interval = 30
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const current = new Date(openingDate);

  while (true) {
    const end = new Date(current);
    end.setMinutes(end.getMinutes() + duration);

    if (end > closingDate) {
      break;
    }

    slots.push({
      startTime: new Date(current),
      endTime: end,
    });

    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
}
