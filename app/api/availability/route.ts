import { NextRequest, NextResponse } from "next/server";
import { getAvailableTimeSlots } from "@/lib/booking/get-available-time-slots";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");
    const serviceId = request.nextUrl.searchParams.get("serviceId");

    console.log("=================================");
    console.log("DATE:", date);
    console.log("SERVICE:", serviceId);
    console.log(
      "REGEX:",
      /^\d{4}-\d{2}-\d{2}$/.test(date ?? "")
    );
    console.log("=================================");

    if (!date || !serviceId) {
      return NextResponse.json(
        { error: "A dátum és a szolgáltatás megadása kötelező." },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Érvénytelen dátum." },
        { status: 400 }
      );
    }

    const slots = await getAvailableTimeSlots({
      date: new Date(`${date}T12:00:00`),
      serviceId,
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Ismeretlen hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}