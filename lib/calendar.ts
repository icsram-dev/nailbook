import {
  addDays,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { hu } from "date-fns/locale";

/**
 * Naptár beállítások
 */
export const START_HOUR = 8;
export const END_HOUR = 17;

export const SLOT_MINUTES = 30;
export const SLOT_HEIGHT = 40;

/**
 * Távolság pixelben az első idősáv tetejétől.
 */
export function getMinutesFromStart(date: Date) {
  const minutes =
    date.getHours() * 60 +
    date.getMinutes() -
    START_HOUR * 60;

  return (minutes / SLOT_MINUTES) * SLOT_HEIGHT;
}

/**
 * Melyik 30 perces slotba esik az időpont?
 */
export function getSlotIndex(date: Date) {
  return Math.floor(
    getMinutesFromStart(date) / SLOT_HEIGHT
  );
}

/**
 * Egy foglalás magassága pixelben.
 */
export function getAppointmentHeight(
  duration: number
) {
  return (
    (duration / SLOT_MINUTES) *
    SLOT_HEIGHT
  );
}

/**
 * Az aktuális hét hétfő–péntek napjai.
 */
export function getWeekDays(date: Date) {
  const monday = startOfWeek(date, {
    weekStartsOn: 1,
  });

  return Array.from(
    { length: 5 },
    (_, index) => addDays(monday, index)
  );
}

/**
 * Nap neve (pl. H, K, Sze)
 */
export function formatDay(date: Date) {
  return format(date, "EEE", {
    locale: hu,
  });
}

/**
 * Dátum (pl. 22.07)
 */
export function formatDate(date: Date) {
  return format(date, "dd.MM", {
    locale: hu,
  });
}

/**
 * Hét intervalluma
 */
export function formatWeekRange(date: Date) {
  const start = startOfWeek(date, {
    weekStartsOn: 1,
  });

  const end = endOfWeek(date, {
    weekStartsOn: 1,
  });

  return `${format(
    start,
    "yyyy.MM.dd"
  )} – ${format(
    end,
    "yyyy.MM.dd"
  )}`;
}

/**
 * Egy adott nap foglalásai.
 */
export function getAppointmentsForDay<
  T extends { startTime: Date }
>(
  appointments: T[],
  day: Date
) {
  return appointments.filter((appointment) =>
    isSameDay(appointment.startTime, day)
  );
}

/**
 * Összes 30 perces idősáv.
 */
export function getTimeSlots() {
  const slotCount =
    ((END_HOUR - START_HOUR) * 60) /
    SLOT_MINUTES;

  return Array.from(
    { length: slotCount },
    (_, index) => {
      const totalMinutes =
        START_HOUR * 60 +
        index * SLOT_MINUTES;

      const hour = Math.floor(
        totalMinutes / 60
      );

      const minute = totalMinutes % 60;

      return {
        index,
        hour,
        minute,
        label: `${hour
          .toString()
          .padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`,
      };
    }
  );
}