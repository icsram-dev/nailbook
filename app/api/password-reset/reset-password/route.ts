import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  deletePasswordResetToken,
  validatePasswordResetToken,
} from "@/lib/password-reset";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const token = body.token;
    const password = body.password;

    if (
      !token ||
      typeof token !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Érvénytelen kérés.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message:
            "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
        },
        {
          status: 400,
        }
      );
    }

    const resetToken =
      await validatePasswordResetToken(token);

    if (!resetToken) {
      return NextResponse.json(
        {
          message:
            "A jelszó-visszaállító link érvénytelen vagy lejárt.",
        },
        {
          status: 400,
        }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: {
        id: resetToken.user.id,
      },
      data: {
        passwordHash,
      },
    });

    await deletePasswordResetToken(token);

    return NextResponse.json({
      message:
        "A jelszavad sikeresen megváltozott.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Váratlan hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}