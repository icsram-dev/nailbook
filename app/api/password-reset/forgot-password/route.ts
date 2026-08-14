import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createPasswordResetToken } from "@/lib/password-reset";
import { sendPasswordResetEmail } from "@/lib/mail";
import { isRateLimitAllowed, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    if (!(await isRateLimitAllowed({ request, namespace: "forgot-password", limit: 5, windowMs: 15 * 60 * 1000 }))) {
      return rateLimitResponse();
    }

    const body = await request.json();

    const email = body.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          message: "Adj meg egy érvényes e-mail címet.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Biztonság miatt mindig ugyanazt válaszoljuk
    if (!user) {
      return NextResponse.json({
        message:
          "Ha létezik ilyen e-mail cím, elküldtük a jelszó-visszaállító linket.",
      });
    }

    const resetToken = await createPasswordResetToken(user.id);

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken.token}`;

    await sendPasswordResetEmail({
      to: user.email,
      customerName: `${user.lastName} ${user.firstName}`,
      resetUrl,
    });

    return NextResponse.json({
      message:
        "Ha létezik ilyen e-mail cím, elküldtük a jelszó-visszaállító linket.",
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
