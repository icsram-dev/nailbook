import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/schemas/appointment";
import { updateAppointment } from "@/lib/appointments/service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "A foglalás nem található." },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      { error: "Hiba történt." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Érvénytelen adatok.",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const appointment = await updateAppointment({
      appointmentId: id,
      ...result.data,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Ismeretlen hiba történt.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Hiba történt." },
      { status: 500 }
    );
  }
}