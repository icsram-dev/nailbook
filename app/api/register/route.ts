import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { isRateLimitAllowed, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    if (
      !(await isRateLimitAllowed({
        request,
        namespace: "register",
        limit: 5,
        windowMs: 60 * 60 * 1000,
      }))
    ) {
      return rateLimitResponse();
    }

    const body = await request.json();

    const { firstName, lastName, email, phone, password } = body;

    if (!firstName || !lastName || !email || !phone || !password) {
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

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.replace(/\s+/g, " ").trim();

    if (trimmedFirstName.length < 2 || trimmedFirstName.length > 30) {
      return NextResponse.json(
        {
          success: false,
          message: "A keresztnév 2 és 30 karakter között lehet.",
        },
        {
          status: 400,
        }
      );
    }

    if (trimmedLastName.length < 2 || trimmedLastName.length > 30) {
      return NextResponse.json(
        {
          success: false,
          message: "A vezetéknév 2 és 30 karakter között lehet.",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Érvénytelen e-mail cím.",
        },
        {
          status: 400,
        }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: trimmedEmail,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Ez az e-mail cím már használatban van.",
        },
        {
          status: 409,
        }
      );
    }

    const existingPhone = await prisma.user.findUnique({
      where: {
        phone: trimmedPhone,
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

    const verifyToken = randomUUID();
    const verifyTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        phone: trimmedPhone,
        password: passwordHash,
        verifyToken,
        verifyTokenExpiresAt,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL;

    if (!appUrl) {
      throw new Error("Hiányzik az alkalmazás nyilvános URL-je.");
    }

    const verifyUrl = `${appUrl}/api/verify-email?token=${verifyToken}`;

    try {
      await sendVerificationEmail({
        to: user.email,
        firstName: user.firstName,
        verifyUrl,
      });
    } catch (error) {
      console.error("Nem sikerült elküldeni a megerősítő e-mailt:", error);
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
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
