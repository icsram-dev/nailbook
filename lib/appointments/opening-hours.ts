import { WeekDay } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface CheckOpeningHoursParams {
  startTime: Date;
  endTime: Date;
}

export async function checkOpeningHours({
  startTime,
  endTime,
}: CheckOpeningHoursParams): Promise<boolean> {
  const days: WeekDay[] = [
    WeekDay.SUNDAY,
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
  ];

  const day = days[startTime.getDay()];

  const openingHour = await prisma.openingHour.findUnique({
    where: {
      day,
    },
  });

  if (!openingHour || !openingHour.isOpen) {
    return false;
  }

  if (!openingHour.opensAt || !openingHour.closesAt) {
    return false;
  }

  const [openHour, openMinute] = openingHour.opensAt
    .split(":")
    .map(Number);

  const [closeHour, closeMinute] = openingHour.closesAt
    .split(":")
    .map(Number);

  const openingDate = new Date(startTime);
  openingDate.setHours(openHour, openMinute, 0, 0);

  const closingDate = new Date(startTime);
  closingDate.setHours(closeHour, closeMinute, 0, 0);

  return (
    startTime >= openingDate &&
    endTime <= closingDate
  );
}