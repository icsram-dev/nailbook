import "dotenv/config";
import { WeekDay } from "@prisma/client";

import { prisma } from "@/lib/prisma";

async function main() {
  const openingHours = [
    {
      day: WeekDay.MONDAY,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      day: WeekDay.TUESDAY,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      day: WeekDay.WEDNESDAY,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      day: WeekDay.THURSDAY,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      day: WeekDay.FRIDAY,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      day: WeekDay.SATURDAY,
      opensAt: null,
      closesAt: null,
      isOpen: false,
    },
    {
      day: WeekDay.SUNDAY,
      opensAt: null,
      closesAt: null,
      isOpen: false,
    },
  ];

  for (const openingHour of openingHours) {
    await prisma.openingHour.upsert({
      where: {
        day: openingHour.day,
      },
      update: openingHour,
      create: openingHour,
    });
  }

  console.log("✅ Alapértelmezett nyitvatartás létrehozva.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });