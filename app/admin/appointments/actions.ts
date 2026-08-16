"use server";

import { prisma } from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/appointments");
  revalidatePath(`/admin/appointments/${id}`);
}
