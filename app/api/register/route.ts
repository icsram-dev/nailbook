import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      password,
    } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Minden kötelező mezőt tölts ki.",
        },
        {
          status: 400,
        }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Ez az email cím már használatban van.",
        },
        {
          status: 409,
        }
      );
    }

    const existingPhone = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (existingPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Ez a telefonszám már használatban van.",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.replace(/\s+/g, " ").trim(),
        password: passwordHash,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Váratlan hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}