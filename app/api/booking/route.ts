import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Bejelentkezés szükséges." },
        { status: 401 }
      );
    }

    if (session.user.role === "ADMIN") {
      return NextResponse.json(
        { error: "Az admin ezen a felületen nem foglalhat." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { serviceId, startTime } = body;

    if (!serviceId || !startTime) {
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

    // Ütközés ellenőrzése
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
          error: "Ez az időpont már nem elérhető.",
        },
        {
          status: 409,
        }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        customerId: session.user.id,
        serviceId,
        startTime: start,
        endTime: end,
        price: service.price,
        status: "CONFIRMED",
        createdByAdmin: false,
      },
      include: {
        customer: true,
        service: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Szerverhiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}