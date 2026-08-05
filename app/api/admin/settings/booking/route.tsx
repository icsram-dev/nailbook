import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { updateBookingSettings } from "@/lib/settings";

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Nincs jogosultság." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (
      typeof body.autoConfirmBookings !== "boolean" ||
      typeof body.cancellationHours !== "number"
    ) {
      return NextResponse.json(
        { error: "Érvénytelen adatok." },
        { status: 400 }
      );
    }

    const settings = await updateBookingSettings(
      body.autoConfirmBookings,
      body.cancellationHours
    );

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Nem sikerült menteni a beállításokat.",
      },
      {
        status: 500,
      }
    );
  }
}