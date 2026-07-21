import { prisma } from "@/lib/prisma";

export async function isWithinOpeningHours(
  date: Date
): Promise<boolean> {
  // JavaScript: vasárnap = 0, hétfő = 1, ..., szombat = 6
  const jsDay = date.getDay();

  // Mi: hétfő = 1 ... vasárnap = 7
  const weekday = jsDay === 0 ? 7 : jsDay;

  const openingHour = await prisma.openingHour.findUnique({
    where: {
      weekday,
    },
  });

  if (!openingHour) {
    return false;
  }

  if (openingHour.isClosed) {
    return false;
  }

  const time = date.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    time >= openingHour.opensAt &&
    time < openingHour.closesAt
  );
}