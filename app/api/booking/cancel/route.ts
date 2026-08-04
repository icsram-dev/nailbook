import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        {
          error: "Hiányzó token.",
        },
        {
          status: 400,
        }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: {
        cancelToken: token,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        {
          error: "Érvénytelen lemondási link.",
        },
        {
          status: 404,
        }
      );
    }

    if (appointment.status === AppointmentStatus.CANCELLED) {
      return NextResponse.json({
        success: true,
        message: "Ez az időpont már le lett mondva.",
      });
    }

    await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
  status: AppointmentStatus.CANCELLED,
  cancelToken: null,
},
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

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