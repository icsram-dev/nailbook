import { NextResponse } from "next/server";
import { sendBookingConfirmed } from "@/lib/mail";

export async function GET() {
  try {
    const result = await sendBookingConfirmed({
      to: "schmidtmaria895@gmail.com",
      customerName: "Mária",
      serviceName: "Gél lakk",
      appointmentDate: "2026. július 30.",
      appointmentTime: "14:00",
      cancelUrl: "http://localhost:3000",
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
