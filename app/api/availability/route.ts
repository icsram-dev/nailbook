import { NextRequest, NextResponse } from "next/server";
import { generateAvailableSlots } from "@/lib/availability/generator";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const date = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!date || !serviceId) {
      return NextResponse.json(
        {
          error: "A date és serviceId paraméter kötelező.",
        },
        {
          status: 400,
        }
      );
    }

    const slots = await generateAvailableSlots({
      date: new Date(date),
      serviceId,
    });

    return NextResponse.json(slots);
  } catch (error) {
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