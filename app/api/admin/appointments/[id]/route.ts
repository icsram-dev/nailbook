import { NextRequest, NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";

import {
  deleteAppointment,
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
          message: "A foglalás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      {
        message: "Hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
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
      note: body.note,
      status: body.status as AppointmentStatus,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json(
      {
        message:
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

    await deleteAppointment(id);

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Nem sikerült törölni a foglalást.",
      },
      {
        status: 500,
      }
    );
  }
}