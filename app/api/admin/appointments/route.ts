import { NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  PENDING: "#f59e0b",
  CONFIRMED: "#22c55e",
  COMPLETED: "#3b82f6",
  CANCELLED: "#ef4444",
  NO_SHOW: "#6b7280",
};

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Bejelentkezés szükséges." },
        { status: 401 }
      );
    }

    const appointments = await prisma.appointment.findMany({
  where: {
    status: {
      in: [
        AppointmentStatus.PENDING,
        AppointmentStatus.CONFIRMED,
      ],
    },
  },

  include: {
    customer: true,
    service: true,
  },

  orderBy: {
    startTime: "asc",
  },
});

    return NextResponse.json(
      appointments.map((appointment) => ({
        id: appointment.id,

        title: `${appointment.customer.name}\n${appointment.service.name}`,

        start: appointment.startTime,
        end: appointment.endTime,

        backgroundColor: STATUS_COLORS[appointment.status],
        borderColor: STATUS_COLORS[appointment.status],

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
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Hiba történt." },
      { status: 500 }
    );
  }
}
