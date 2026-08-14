import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { appointmentSchema } from "@/schemas/appointment";
import { createAppointment } from "@/lib/appointments/service";
import { requireAdmin } from "@/lib/api/admin";

export async function GET() {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

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
      title: `${appointment.customer.lastName} ${appointment.customer.firstName}\n${appointment.service.name}`,
      start: appointment.startTime,
      end: appointment.endTime,

      backgroundColor: colors[appointment.status],
      borderColor: colors[appointment.status],

      extendedProps: {
        customerId: appointment.customer.id,
        customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
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
      return NextResponse.json({ error: "Bejelentkezés szükséges." }, { status: 401 });
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

    const customerId = session.user.role === "ADMIN" ? body.customerId : session.user.id;
    if (!customerId || typeof customerId !== "string") {
      return NextResponse.json({ error: "Válassz vendéget." }, { status: 400 });
    }

    if (session.user.role !== "ADMIN" && !session.user.isEmailVerified) {
      return NextResponse.json({ error: "Az időpontfoglaláshoz előbb erősítsd meg az e-mail címed." }, { status: 403 });
    }

    const appointment = await createAppointment({
  customerId,
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
