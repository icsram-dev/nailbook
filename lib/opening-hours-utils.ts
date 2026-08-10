import { WeekDay } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const WEEK_DAYS: WeekDay[] = [
  WeekDay.SUNDAY,
  WeekDay.MONDAY,
  WeekDay.TUESDAY,
  WeekDay.WEDNESDAY,
  WeekDay.THURSDAY,
  WeekDay.FRIDAY,
  WeekDay.SATURDAY,
];

export async function isWithinOpeningHours(date: Date): Promise<boolean> {
  const openingHour = await prisma.openingHour.findUnique({
    where: { day: WEEK_DAYS[date.getDay()] },
  });

  if (!openingHour?.isOpen || !openingHour.opensAt || !openingHour.closesAt) {
    return false;
  }

  const time = date.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time >= openingHour.opensAt && time < openingHour.closesAt;
}
