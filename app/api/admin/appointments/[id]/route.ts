import { NextRequest, NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";

import {
  cancelAppointment,
  getAppointmentById,
  updateAppointment,
} from "@/lib/appointments/service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const appointment = await getAppointmentById(id);

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

    return NextResponse.json(appointment);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const appointment = await updateAppointment({
      appointmentId: id,
      customerId: body.customerId,
      serviceId: body.serviceId,
      startTime: new Date(body.startTime),
      customerNote: body.customerNote ?? null,
      status: body.status as AppointmentStatus,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Hiba történt.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await cancelAppointment(id);

    return NextResponse.json({
      success: true,
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