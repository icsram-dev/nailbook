import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [customers, services] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),
    

    prisma.service.findMany({
      where: {
        active: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        duration: true,
        price: true,
      },
    }),
  ]);

  return NextResponse.json({
    customers,
    services,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { customerId, serviceId, startTime } = body;

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

    const overlap = await prisma.appointment.findFirst({
      where: {
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

    if (overlap) {
      return NextResponse.json(
        {
          error: "Erre az időpontra már van foglalás.",
        },
        {
          status: 409,
        }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        customerId,
        serviceId,
        startTime: start,
        endTime: end,
        price: service.price,
        status: "CONFIRMED",
        createdByAdmin: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Szerverhiba.",
      },
      {
        status: 500,
      }
    );
  }
}