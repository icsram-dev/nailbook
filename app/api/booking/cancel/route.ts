import { NextRequest, NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

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

    const settings = await getSettings();

    const cancellationHours =
      settings?.cancellationHours ?? 24;

    const hoursUntilAppointment =
      (appointment.startTime.getTime() - Date.now()) /
      (1000 * 60 * 60);

    if (hoursUntilAppointment < cancellationHours) {
      return NextResponse.json(
        {
          error: `A foglalás legkésőbb ${cancellationHours} órával az időpont előtt mondható le.`,
        },
        {
          status: 400,
        }
      );
    }

    await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: AppointmentStatus.CANCELLED,
        cancelToken: null,
        cancelledBy: "CUSTOMER",
        cancelledAt: new Date(),
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