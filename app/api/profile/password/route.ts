import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Nincs jogosultság.",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = body;

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Minden mező kitöltése kötelező.",
      },
      {
        status: 400,
      }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Az új jelszónak legalább 8 karakter hosszúnak kell lennie.",
      },
      {
        status: 400,
      }
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      {
        success: false,
        message: "A két új jelszó nem egyezik.",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user || !user.passwordHash) {
    return NextResponse.json(
      {
        success: false,
        message: "A felhasználó nem található.",
      },
      {
        status: 404,
      }
    );
  }

  const passwordCorrect = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!passwordCorrect) {
    return NextResponse.json(
      {
        success: false,
        message: "A jelenlegi jelszó hibás.",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash: hashedPassword,
    },
  });

  return NextResponse.json({
    success: true,
    message: "A jelszó sikeresen módosítva.",
  });
}