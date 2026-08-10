import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/schemas/appointment";
import {
  updateAppointment,
  cancelAppointment,
} from "@/lib/appointments/service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type CancellationReason =
  | "CUSTOMER_CANCELLED"
  | "ADMIN_CANCELLED"
  | "NO_SHOW"
  | "OTHER";

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const appointment =
      await prisma.appointment.findUnique({
        where: {
          id,
        },
        include: {
          customer: true,
          service: true,
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

    return NextResponse.json(appointment);
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

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Érvénytelen adatok.",
          details: result.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const existingAppointment =
      await prisma.appointment.findUnique({
        where: {
          id,
        },
        select: {
          customerId: true,
        },
      });

    if (!existingAppointment) {
      return NextResponse.json(
        {
          error: "A foglalás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    const appointment = await updateAppointment({
      appointmentId: id,
      customerId: existingAppointment.customerId,
      serviceId: result.data.serviceId,
      startTime: result.data.startTime,
      customerNote: result.data.note,
      status: result.data.status,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Ismeretlen hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const reason =
      body.reason as CancellationReason | undefined;

    const note =
      typeof body.note === "string"
        ? body.note.trim()
        : null;

    const validReasons: CancellationReason[] = [
      "CUSTOMER_CANCELLED",
      "ADMIN_CANCELLED",
      "NO_SHOW",
      "OTHER",
    ];

    if (
      !reason ||
      !validReasons.includes(reason)
    ) {
      return NextResponse.json(
        {
          error:
            "Érvénytelen lemondási ok.",
        },
        {
          status: 400,
        }
      );
    }

    let status:
      | "CANCELLED"
      | "NO_SHOW";

    let cancelledBy:
      | "CUSTOMER"
      | "ADMIN";

    switch (reason) {
      case "NO_SHOW":
        status = "NO_SHOW";
        cancelledBy = "ADMIN";
        break;

      case "CUSTOMER_CANCELLED":
        status = "CANCELLED";
        cancelledBy = "CUSTOMER";
        break;

      case "ADMIN_CANCELLED":
        status = "CANCELLED";
        cancelledBy = "ADMIN";
        break;

      case "OTHER":
        status = "CANCELLED";
        cancelledBy = "ADMIN";
        break;
    }

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
        {
          status: 404,
        }
      );
    }

    const updatedAppointment =
      await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          status,
          cancelledBy,
          cancelledAt: new Date(),
          cancelReason: note
            ? `${getReasonLabel(reason)} – ${note}`
            : getReasonLabel(reason),
        },
      });

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(
      "Foglalás lemondása sikertelen:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}

function getReasonLabel(
  reason: CancellationReason
) {
  switch (reason) {
    case "CUSTOMER_CANCELLED":
      return "Vendég lemondta";

    case "ADMIN_CANCELLED":
      return "Admin lemondta";

    case "NO_SHOW":
      return "Vendég nem jelent meg";

    case "OTHER":
      return "Egyéb";
  }
}