import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vacationSchema } from "@/lib/validations/vacation";

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

    const result = vacationSchema.safeParse(body);

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

    const vacation = await prisma.vacation.update({
      where: {
        id,
      },
      data: result.data,
    });

    return NextResponse.json(vacation);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült módosítani a szabadságot.",
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

    await prisma.vacation.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült törölni a szabadságot.",
      },
      {
        status: 500,
      }
    );
  }
}