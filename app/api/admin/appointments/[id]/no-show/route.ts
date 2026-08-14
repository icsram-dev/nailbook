import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const { id } = await params;

    const appointment =
      await prisma.appointment.findUnique({
        where: {
          id,
        },
      });

    if (!appointment) {
      return NextResponse.json(
        {
          error: "A foglalás nem található.",
        },
        { status: 404 }
      );
    }

    if (
      appointment.status === "CANCELLED" ||
      appointment.status === "COMPLETED" ||
      appointment.status === "NO_SHOW"
    ) {
      return NextResponse.json(
        {
          error:
            "Ez a foglalás nem állítható nem jelent meg státuszra.",
        },
        { status: 400 }
      );
    }

    if (appointment.startTime > new Date()) {
      return NextResponse.json(
        {
          error:
            "Csak elmúlt időponthoz állítható be a nem jelent meg státusz.",
        },
        { status: 400 }
      );
    }

    const updatedAppointment =
      await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          status: "NO_SHOW",
        },
      });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error(
      "NO_SHOW státusz beállítása sikertelen:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Nem sikerült a foglalást nem jelent meg státuszra állítani.",
      },
      { status: 500 }
    );
  }
}
