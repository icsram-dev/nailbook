import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const openingHours = [
    {
      weekday: 1,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: false,
    },
    {
      weekday: 2,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: false,
    },
    {
      weekday: 3,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: false,
    },
    {
      weekday: 4,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: false,
    },
    {
      weekday: 5,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: false,
    },
    {
      weekday: 6,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: true,
    },
    {
      weekday: 7,
      opensAt: "08:00",
      closesAt: "17:00",
      isClosed: true,
    },
  ];

  for (const openingHour of openingHours) {
    await prisma.openingHour.upsert({
      where: {
        weekday: openingHour.weekday,
      },
      update: openingHour,
      create: openingHour,
    });
  }

  console.log("✅ Nyitvatartás létrehozva.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });