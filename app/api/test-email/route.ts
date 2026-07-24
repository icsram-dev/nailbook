import { NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/lib/mail";

export async function GET() {
  try {
    const result = await sendBookingConfirmation({
      to: "schmidtmaria895@gmail.com",
      customerName: "Mária",
      serviceName: "Gél lakk",
      appointmentDate: "2026. július 30.",
      appointmentTime: "14:00",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}
