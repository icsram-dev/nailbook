import { prisma } from "@/lib/prisma";
import { UpdateOpeningHoursInput } from "./validations/opening-hours";

export async function updateOpeningHours(
  data: UpdateOpeningHoursInput
) {
  await prisma.$transaction(
    data.map((day) =>
      prisma.openingHour.update({
        where: {
          id: day.id,
        },
        data: {
          opensAt: day.opensAt,
          closesAt: day.closesAt,
          isClosed: day.isClosed,
        },
      })
    )
  );
}