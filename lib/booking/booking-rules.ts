import { addDays, addMonths, isAfter, startOfDay } from "date-fns";

import { BOOKING_CONFIG } from "@/config/booking";

type BookingRulesOptions = {
  isAdmin?: boolean;
  now?: Date;
};

export function getMinBookingDate(now = new Date()) {
  const today = startOfDay(now);

  if (now.getHours() < BOOKING_CONFIG.NEXT_DAY_BOOKING_DEADLINE) {
    return addDays(today, 1);
  }

  return addDays(today, 2);
}

export function getMaxBookingDate(now = new Date()) {
  return addMonths(startOfDay(now), BOOKING_CONFIG.CUSTOMER_MONTH_LIMIT);
}

export function isBookableDate(date: Date, options: BookingRulesOptions = {}) {
  const { isAdmin = false, now = new Date() } = options;

  // Admin bármeddig foglalhat előre
  if (isAdmin) {
    return true;
  }

  const selected = startOfDay(date);

  // Hétvégére nem lehet foglalni
  const day = selected.getDay();

  if (day === 0 || day === 6) {
    return false;
  }

  const min = getMinBookingDate(now);
  const max = getMaxBookingDate(now);

  return !isAfter(min, selected) && !isAfter(selected, max);
}
