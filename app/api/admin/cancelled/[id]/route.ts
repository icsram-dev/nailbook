import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Bejelentkezés szükséges.",
        },
        {
          status: 401,
        }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Nincs jogosultság.",
        },
        {
          status: 403,
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

    if (appointment.status !== "CANCELLED" && appointment.status !== "NO_SHOW") {
      return NextResponse.json(
        {
          error: "Csak lemondott vagy meg nem jelent foglalás törölhető végleg.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "A foglalás sikeresen törölve.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Nem sikerült törölni a foglalást.",
      },
      {
        status: 500,
      }
    );
  }
}
