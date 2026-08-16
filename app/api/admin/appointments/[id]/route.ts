import { NextRequest, NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import {
  cancelAppointment,
  getAppointmentById,
  updateAppointment,
} from "@/lib/appointments/service";
import { requireAdmin } from "@/lib/api/admin";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
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
        error: error instanceof Error ? error.message : "Hiba történt.",
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
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const { id } = await params;

    let body: {
      reason?: string;
      note?: string;
    } = {};

    try {
      body = await request.json();
    } catch {
      // Ha nincs body, normál lemondásként kezeljük.
    }

    /*
     * Ha a vendég nem jelent meg,
     * nem töröljük a foglalást.
     *
     * Az előzményekben meg kell maradnia,
     * csak a státusza változik NO_SHOW-ra.
     */
    if (body.reason === "NO_SHOW") {
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

      if (appointment.status === "CANCELLED" || appointment.status === "NO_SHOW") {
        return NextResponse.json(
          {
            error: "Ez a foglalás már lezárt státuszban van.",
          },
          {
            status: 400,
          }
        );
      }

      const updatedAppointment = await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          status: "NO_SHOW",
          internalNote: body.note?.trim() || appointment.internalNote,
        },
      });

      return NextResponse.json({
        success: true,
        appointment: updatedAppointment,
      });
    }

    /*
     * Normál lemondás.
     */
    await cancelAppointment(id);

    /*
     * Ha érkezett lemondási megjegyzés,
     * azt elmentjük az időponthoz.
     */
    if (body.note?.trim()) {
      await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          internalNote: body.note.trim(),
          cancelReason: body.reason ?? null,
        },
      });
    } else if (body.reason) {
      await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          cancelReason: body.reason,
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Nem sikerült módosítani a foglalást.",
      },
      {
        status: 500,
      }
    );
  }
}
