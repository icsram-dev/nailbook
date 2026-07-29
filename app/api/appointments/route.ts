import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { appointmentSchema } from "@/schemas/appointment";
import { createAppointment } from "@/lib/appointments/service";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Bejelentkezés szükséges.",
        },
        {
          status: 401,
        }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        customerId: session.user.id,
      },
      include: {
        service: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json(
      {
        error: "Hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Bejelentkezés szükséges.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Érvénytelen adatok.",
          details: result.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const appointment = await createAppointment({
      customerId: session.user.id,
      serviceId: result.data.serviceId,
      startTime: result.data.startTime,
      note: result.data.note,
      status: result.data.status,
    });

    return NextResponse.json(appointment, {
      status: 201,
    });
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