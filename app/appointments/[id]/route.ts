import { NextRequest, NextResponse } from "next/server";

import { AppointmentStatus } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        {
          error: "A foglalás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    if (appointment.customerId !== session.user.id) {
      return NextResponse.json(
        {
          error: "Nincs jogosultságod ehhez a foglaláshoz.",
        },
        {
          status: 403,
        }
      );
    }

    if (appointment.status === AppointmentStatus.CANCELLED) {
      return NextResponse.json(
        {
          error: "A foglalás már le lett mondva.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedAppointment =
      await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          status: AppointmentStatus.CANCELLED,
        },
      });

    return NextResponse.json(updatedAppointment);
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