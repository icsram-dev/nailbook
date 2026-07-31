"use server";

import { revalidatePath } from "next/cache";

import {
  createVacation,
  deleteVacation,
} from "@/lib/vacations";

import { vacationSchema } from "@/lib/validations/vacation";

export async function createVacationAction(data: unknown) {
  const validatedData = vacationSchema.parse(data);

  await createVacation(validatedData);

  revalidatePath("/admin/vacations");
}

export async function deleteVacationAction(id: string) {
  await deleteVacation(id);

  revalidatePath("/admin/vacations");

  return {
    success: true,
  };
}