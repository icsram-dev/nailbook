import { NextRequest, NextResponse } from "next/server";
import { updateOpeningHours } from "@/lib/opening-hours";
import { updateOpeningHoursSchema } from "@/lib/validations/opening-hours";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const data = updateOpeningHoursSchema.parse(body);

    await updateOpeningHours(data);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Nem sikerült menteni.",
      },
      {
        status: 400,
      }
    );
  }
}