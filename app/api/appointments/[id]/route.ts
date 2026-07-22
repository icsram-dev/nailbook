import { NextRequest, NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validations/appointment";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const data = appointmentSchema.parse(body);

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          message: "A szolgáltatás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    const endTime = new Date(
      data.startTime.getTime() +
        service.duration * 60 * 1000
    );

    const conflict =
      await prisma.appointment.findFirst({
        where: {
          id: {
            not: id,
          },
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
        {
          status: 409,
        }
      );
    }

    const appointment =
      await prisma.appointment.update({
        where: {
          id,
        },
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

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);

    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message:
              "A foglalás nem található.",
          },
          {
            status: 404,
          }
        );
      }
    }

    return NextResponse.json(
      {
        message:
          "Nem sikerült frissíteni a foglalást.",
      },
      {
        status: 500,
      }
    );
  }
}