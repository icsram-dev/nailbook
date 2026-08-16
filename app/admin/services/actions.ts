"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createService, updateService, deleteService } from "@/lib/services";

import { serviceSchema } from "@/lib/validations/service";

export async function createServiceAction(data: unknown) {
  const validatedData = serviceSchema.parse(data);

  await createService(validatedData);

  revalidatePath("/admin/services");
}

export async function updateServiceAction(id: string, data: unknown) {
  const validatedData = serviceSchema.parse(data);

  await updateService(id, validatedData);

  revalidatePath("/admin/services");
}

export async function deleteServiceAction(id: string) {
  try {
    await deleteService(id);

    revalidatePath("/admin/services");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      return {
        success: false,
        message: "Ez a szolgáltatás nem törölhető, mert már tartoznak hozzá időpontok.",
      };
    }

    throw error;
  }
}
