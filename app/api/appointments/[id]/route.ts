import { NextRequest, NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validations/appointment";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const data = appointmentSchema.parse(body);

    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      include: {
        customer: true,
        service: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "A foglalás nem található." },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Nem sikerült frissíteni a foglalást." },
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
      where: { id },
    });

    return NextResponse.json({
      message: "A foglalás sikeresen törölve.",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "A foglalás nem található." },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Nem sikerült törölni a foglalást." },
      { status: 500 }
    );
  }
}