import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "A foglalás nem található." },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      { error: "Hiba történt." },
      { status: 500 }
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

    const {
  customerId,
  serviceId,
  startTime,
  status,
} = body;

    if (!customerId || !serviceId || !startTime) {
      return NextResponse.json(
        { error: "Hiányzó adatok." },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "A szolgáltatás nem található." },
        { status: 404 }
      );
    }

    const start = new Date(startTime);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + service.duration);

    const overlapping = await prisma.appointment.findFirst({
      where: {
        id: {
          not: id,
        },
        status: {
          notIn: ["CANCELLED", "NO_SHOW"],
        },
        startTime: {
          lt: end,
        },
        endTime: {
          gt: start,
        },
      },
    });

    if (overlapping) {
      return NextResponse.json(
        { error: "Ebben az időpontban már van foglalás." },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.update({
  where: {
    id,
  },
  data: {
    customerId,
    serviceId,
    startTime: start,
    endTime: end,
    price: service.price,
    status: status ?? "CONFIRMED",
  },
});

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      { error: "Hiba történt." },
      { status: 500 }
    );
  }
}