import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validations/appointment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = appointmentSchema.parse(body);

    const customer = await prisma.user.findUnique({
      where: {
        id: data.customerId,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { message: "A vendég nem található." },
        { status: 404 }
      );
    }

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
      },
    });

    if (!service) {
      return NextResponse.json(
        { message: "A szolgáltatás nem található." },
        { status: 404 }
      );
    }

    const endTime = new Date(
      data.startTime.getTime() +
        service.duration * 60 * 1000
    );

    const conflict =
      await prisma.appointment.findFirst({
        where: {
          status: {
            not: "CANCELLED",
          },

          startTime: {
            lt: endTime,
          },

          endTime: {
            gt: data.startTime,
          },
        },
      });

    if (conflict) {
      return NextResponse.json(
        {
          message:
            "Erre az időpontra már van foglalás.",
        },
        { status: 409 }
      );
    }

    const appointment =
      await prisma.appointment.create({
        data: {
          customerId: data.customerId,
          serviceId: data.serviceId,
          startTime: data.startTime,
          endTime,
          price: service.price,
          note: data.note,
        },
        include: {
          customer: true,
          service: true,
        },
      });

    return NextResponse.json(appointment, {
      status: 201,
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          message: "Érvénytelen adatok.",
          errors: error.flatten(),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Nem sikerült létrehozni a foglalást.",
      },
      { status: 500 }
    );
  }
}