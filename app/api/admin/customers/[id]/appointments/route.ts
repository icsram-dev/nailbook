import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Bejelentkezés szükséges." }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nincs jogosultságod a törléshez." }, { status: 403 });
    }

    const { id: customerId } = await params;

    const body = await request.json();

    const appointmentIds = body.appointmentIds;

    if (!Array.isArray(appointmentIds) || appointmentIds.length === 0) {
      return NextResponse.json({ error: "Nincs kijelölt foglalás." }, { status: 400 });
    }

    // Ellenőrizzük, hogy a vendég létezik.
    const customer = await prisma.user.findUnique({
      where: {
        id: customerId,
      },
      select: {
        id: true,
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "A vendég nem található." }, { status: 404 });
    }

    // A kijelölt foglalások végleges törlése.
    const result = await prisma.appointment.deleteMany({
      where: {
        id: {
          in: appointmentIds,
        },
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        {
          error: "A kijelölt foglalások nem találhatók.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedCount: result.count,
    });
  } catch (error) {
    console.error("Foglalások törlése sikertelen:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Nem sikerült törölni a foglalásokat.",
      },
      {
        status: 500,
      }
    );
  }
}
