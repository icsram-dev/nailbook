import { addMinutes, format, set } from "date-fns";

/**
 * Egy dátumhoz hozzáad egy HH:mm időpontot.
 *
 * Példa:
 * 2026-08-10 + "08:30"
 * =>
 * 2026-08-10 08:30
 */
export function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return set(date, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });
}

/**
 * Date -> HH:mm
 */
export function formatTime(date: Date) {
  return format(date, "HH:mm");
}

/**
 * HH:mm -> percek
 *
 * 08:30 => 510
 */
export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

/**
 * Percek -> HH:mm
 *
 * 510 => 08:30
 */
export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

/**
 * HH:mm + percek
 *
 * 08:00 + 90
 * =>
 * 09:30
 */
export function addMinutesToTime(time: string, minutes: number) {
  return minutesToTime(timeToMinutes(time) + minutes);
}

/**
 * Date + percek
 */
export function addMinutesToDate(date: Date, minutes: number) {
  return addMinutes(date, minutes);
}
