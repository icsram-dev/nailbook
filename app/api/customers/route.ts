import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { customerSchema } from "@/lib/validations/customer";

export async function GET() {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  try {
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

    const customer = await prisma.user.create({
      data: {
        ...result.data,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json(customer, {
      status: 201,
    });
  } catch (error) {
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