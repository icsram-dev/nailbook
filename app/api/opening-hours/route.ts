import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { openingHoursSchema } from "@/lib/validations/opening-hour";
import { requireAdmin } from "@/lib/api/admin";

export async function PATCH(request: Request) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const body = await request.json();

    const openingHours = openingHoursSchema.parse(body);

    await prisma.$transaction(
      openingHours.map((day) =>
        prisma.openingHour.update({
          where: {
            day: day.day,
          },
          data: {
            isOpen: day.isOpen,
            opensAt: day.opensAt,
            closesAt: day.closesAt,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Nem sikerült menteni a nyitvatartást.",
      },
      {
        status: 500,
      }
    );
  }
}
