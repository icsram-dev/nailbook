import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { customerSchema } from "@/lib/validations/customer";

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

    const result = customerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Érvénytelen adatok.",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const customer = await prisma.user.update({
      where: {
        id,
      },
      data: result.data,
    });

    return NextResponse.json(customer);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "A vendég nem található.",
        },
        {
          status: 404,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Szerverhiba.",
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

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "A vendég nem található.",
        },
        {
          status: 404,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Szerverhiba.",
      },
      {
        status: 500,
      }
    );
  }
}