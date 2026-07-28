"use server";

import { revalidatePath } from "next/cache";

import { openingHourSchema } from "@/lib/validations/opening-hour";
import { updateOpeningHours } from "@/lib/opening-hours";

export async function updateOpeningHoursAction(
  formData: unknown[],
) {
  try {
    const validatedData = formData.map((item) =>
      openingHourSchema.parse(item),
    );

    await updateOpeningHours(validatedData);

    revalidatePath("/admin/opening-hours");

    return {
      success: true,
      message: "A nyitvatartás sikeresen frissítve.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba történt.",
    };
  }
}