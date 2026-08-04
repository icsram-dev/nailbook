import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { appointmentSchema } from "@/schemas/appointment";
import { createAppointment } from "@/lib/appointments/service";

export async function GET() {
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

    const appointments = await prisma.appointment.findMany({
      include: {
        customer: true,
        service: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    const colors = {
      PENDING: "#f59e0b",
      CONFIRMED: "#22c55e",
      COMPLETED: "#3b82f6",
      CANCELLED: "#ef4444",
      NO_SHOW: "#6b7280",
    };

    const events = appointments.map((appointment) => ({
      id: appointment.id,
      title: `${appointment.customer.name}\n${appointment.service.name}`,
      start: appointment.startTime,
      end: appointment.endTime,

      backgroundColor: colors[appointment.status],
      borderColor: colors[appointment.status],

      extendedProps: {
        customerId: appointment.customer.id,
        customerName: appointment.customer.name,
        customerPhone: appointment.customer.phone,
        customerEmail: appointment.customer.email,

        serviceId: appointment.service.id,
        serviceName: appointment.service.name,
        duration: appointment.service.duration,
        price: appointment.price,

        status: appointment.status,

        customerNote: appointment.customerNote,
        internalNote: appointment.internalNote,
      },
    }));

    return NextResponse.json(events);
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

export async function POST(request: NextRequest) {
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

    const appointment = await createAppointment({
  customerId: session.user.id,
  serviceId: result.data.serviceId,
  startTime: result.data.startTime,
  customerNote: result.data.note,
  status: result.data.status,
});

    return NextResponse.json(appointment, {
      status: 201,
    });
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