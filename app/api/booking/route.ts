import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { createAppointment } from "@/lib/appointments/service";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  startTime: z.string().datetime(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Bejelentkezés szükséges." }, { status: 401 });
    }

    if (session.user.role === "ADMIN") {
      return NextResponse.json({ error: "Az admin ezen a felületen nem foglalhat." }, { status: 403 });
    }

    if (!session.user.isEmailVerified) {
      return NextResponse.json({ error: "Az időpontfoglaláshoz előbb erősítsd meg az e-mail címed." }, { status: 403 });
    }

    const result = bookingSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json({ error: "Érvénytelen foglalási adatok." }, { status: 400 });
    }

    const appointment = await createAppointment({
      customerId: session.user.id,
      serviceId: result.data.serviceId,
      startTime: new Date(result.data.startTime),
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "A foglalás nem sikerült." },
      { status: 400 }
    );
  }
}
