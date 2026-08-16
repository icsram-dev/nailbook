import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Hiányzó token.",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
    },
  });

  if (!user || !user.verifyTokenExpiresAt || user.verifyTokenExpiresAt <= new Date()) {
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { verifyToken: null, verifyTokenExpiresAt: null },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Érvénytelen token.",
      },
      {
        status: 404,
      }
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isEmailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
    },
  });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verify-email?success=true`);
}
