import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const openingHours = [
    {
      weekday: 1,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      weekday: 2,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      weekday: 3,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      weekday: 4,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      weekday: 5,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: true,
    },
    {
      weekday: 6,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: false,
    },
    {
      weekday: 7,
      opensAt: "08:00",
      closesAt: "17:00",
      isOpen: false,
    },
  ];

  for (const openingHour of openingHours) {
    await prisma.openingHour.upsert({
      where: {
        weekday: openingHour.weekday,
      },
      update: {
        opensAt: openingHour.opensAt,
        closesAt: openingHour.closesAt,
        isOpen: openingHour.isOpen,
      },
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