"use server";

import { prisma } from "@/lib/prisma";
import { OpeningHourFormValues } from "@/lib/validations/opening-hour";
import { WeekDay } from "@prisma/client";

const dayOrder: WeekDay[] = [
  WeekDay.MONDAY,
  WeekDay.TUESDAY,
  WeekDay.WEDNESDAY,
  WeekDay.THURSDAY,
  WeekDay.FRIDAY,
  WeekDay.SATURDAY,
  WeekDay.SUNDAY,
];

export async function getOpeningHours() {
  const openingHours = await prisma.openingHour.findMany();

  return openingHours.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
}

export async function updateOpeningHours(openingHours: OpeningHourFormValues[]) {
  return prisma.$transaction(
    openingHours.map((openingHour) =>
      prisma.openingHour.update({
        where: {
          day: openingHour.day,
        },
        data: {
          isOpen: openingHour.isOpen,
          opensAt: openingHour.isOpen ? openingHour.opensAt : null,
          closesAt: openingHour.isOpen ? openingHour.closesAt : null,
        },
      })
    )
  );
}
