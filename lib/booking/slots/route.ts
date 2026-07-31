import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAvailableTimeSlots } from "@/lib/booking/get-available-time-slots";

const querySchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().datetime(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const result = querySchema.safeParse({
      serviceId: searchParams.get("serviceId"),
      date: searchParams.get("date"),
    });

    if (!result.success) {
      return NextResponse.json(
        { message: "Érvénytelen kérés." },
        { status: 400 }
      );
    }

    const slots = await getAvailableTimeSlots({
      serviceId: result.data.serviceId,
      date: new Date(result.data.date),
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült lekérni az időpontokat.",
      },
      {
        status: 500,
      }
    );
  }
}