export const WORKDAY = {
  startHour: 9,
  endHour: 17,
  interval: 30,
};

export type BookingAppointment = {
  start: number; // percek éjféltől
  end: number;
};

export function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);

  return hour * 60 + minute;
}

export function minutesToTime(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export function generateTimeSlots(
  startHour: number,
  endHour: number,
  interval: number
) {
  const slots: string[] = [];

  for (
    let current = startHour * 60;
    current < endHour * 60;
    current += interval
  ) {
    slots.push(minutesToTime(current));
  }

  return slots;
}

export function hasOverlap(
  start: number,
  end: number,
  appointments: BookingAppointment[]
) {
  return appointments.some(
    (appointment) =>
      start < appointment.end &&
      end > appointment.start
  );
}

export function isTimeSlotAvailable(
  slot: string,
  duration: number,
  appointments: BookingAppointment[]
) {
  const slotStart = timeToMinutes(slot);
  const slotEnd = slotStart + duration;

  // Munkaidő vége
  if (slotEnd > WORKDAY.endHour * 60) {
    return false;
  }

  // Ütközés
  if (hasOverlap(slotStart, slotEnd, appointments)) {
    return false;
  }

  return true;
}