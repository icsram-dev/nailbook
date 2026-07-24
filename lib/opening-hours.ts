import { prisma } from "@/lib/prisma";

export async function getOpeningHours() {
  return prisma.openingHour.findMany({
    orderBy: {
      weekday: "asc",
    },
  });
}