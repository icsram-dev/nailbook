import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations/service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const result = serviceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const service = await prisma.service.update({
      where: {
        id,
      },
      data: result.data,
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "A szolgáltatás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Nem sikerült módosítani a szolgáltatást.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "A szolgáltatás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Nem sikerült törölni a szolgáltatást.",
      },
      {
        status: 500,
      }
    );
  }
}