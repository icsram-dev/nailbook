import { startOfDay, endOfDay } from "date-fns";

import { prisma } from "@/lib/prisma";

import type { VacationData } from "@/lib/validations/vacation";

export async function getVacations() {
  return prisma.vacation.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
}

export async function createVacation(data: VacationData) {
  return prisma.vacation.create({
    data: {
      startDate: startOfDay(data.startDate),
      endDate: endOfDay(data.endDate),
      reason: data.reason?.trim() || null,
    },
  });
}

export async function deleteVacation(id: string) {
  return prisma.vacation.delete({
    where: {
      id,
    },
  });
}