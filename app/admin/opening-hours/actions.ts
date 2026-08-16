"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { WeekDay } from "@prisma/client";

export async function getOpeningHours() {
  return prisma.openingHour.findMany({
    orderBy: {
      day: "asc",
    },
  });
}

type UpdateOpeningHourInput = {
  day: WeekDay;
  isOpen: boolean;
  opensAt: string | null;
  closesAt: string | null;
};

export async function updateOpeningHours(openingHours: UpdateOpeningHourInput[]) {
  await prisma.$transaction(
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

  revalidatePath("/admin/opening-hours");
}
