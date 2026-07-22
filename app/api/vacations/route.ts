import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vacationSchema } from "@/lib/validations/vacation";

export async function GET() {
  try {
    const vacations = await prisma.vacation.findMany({
      orderBy: {
        startDate: "asc",
      },
    });

    return NextResponse.json(vacations);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült lekérni a szabadságokat.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const vacation = await prisma.vacation.create({
      data: result.data,
    });

    return NextResponse.json(vacation, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült létrehozni a szabadságot.",
      },
      {
        status: 500,
      }
    );
  }
}