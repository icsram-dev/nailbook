import { prisma } from "@/lib/prisma";
import { VacationInput } from "./validations/vacation";

export async function createVacation(data: VacationInput) {
  return prisma.vacation.create({
    data,
  });
}

export async function getVacations() {
  return prisma.vacation.findMany({
    orderBy: {
      startDate: "asc",
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
