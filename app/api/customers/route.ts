import { randomUUID } from "crypto";

import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { customerSchema } from "@/lib/validations/customer";

export async function GET() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      include: {
        appointments: {
          orderBy: {
            startTime: "desc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const result = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,

      appointmentsCount: customer.appointments.length,

      lastAppointment:
        customer.appointments[0]?.startTime ?? null,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült lekérni a vendégeket.",
      },
      {
        status: 500,
      }
    );
  }
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
        {
          status: 400,
        }
      );
    }

    const existingCustomer = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existingCustomer) {
      return NextResponse.json(
        {
          message: "Már létezik vendég ezzel az e-mail címmel.",
        },
        {
          status: 409,
        }
      );
    }

    const temporaryPassword = randomUUID();

    const hashedPassword = await bcrypt.hash(
      temporaryPassword,
      12
    );

    const customer = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        password: hashedPassword,
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