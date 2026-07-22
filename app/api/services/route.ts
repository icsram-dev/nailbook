import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations/service";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült lekérni a szolgáltatásokat.",
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

    const service = await prisma.service.create({
      data: result.data,
    });

    return NextResponse.json(service, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült létrehozni a szolgáltatást.",
      },
      {
        status: 500,
      }
    );
  }
}