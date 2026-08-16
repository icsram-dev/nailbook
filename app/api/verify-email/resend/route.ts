import { randomUUID } from "crypto";

import { NextResponse } from "next/server";

import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { isRateLimitAllowed, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    if (
      !(await isRateLimitAllowed({
        request,
        namespace: "verify-email-resend",
        limit: 3,
        windowMs: 15 * 60 * 1000,
      }))
    ) {
      return rateLimitResponse();
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Adj meg egy érvényes e-mail címet." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user || user.isEmailVerified) {
      return NextResponse.json({
        message:
          "Ha ehhez a címhez megerősítésre váró fiók tartozik, elküldtük a megerősítő linket.",
      });
    }

    const verifyToken = randomUUID();
    const verifyTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await prisma.user.update({
      where: { id: user.id },
      data: { verifyToken, verifyTokenExpiresAt },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL;
    if (!appUrl) {
      throw new Error("Hiányzik az alkalmazás nyilvános URL-je.");
    }

    await sendVerificationEmail({
      to: user.email,
      firstName: user.firstName,
      verifyUrl: `${appUrl}/api/verify-email?token=${verifyToken}`,
    });

    return NextResponse.json({
      message:
        "Elküldtük a megerősítő e-mailt. Kérjük, nézd meg a beérkező levelek és a spam mappát is.",
    });
  } catch (error) {
    console.error("Verification e-mail resend failed:", error);

    return NextResponse.json(
      { message: "A megerősítő e-mail küldése most nem sikerült. Kérjük, próbáld meg később." },
      { status: 500 }
    );
  }
}
