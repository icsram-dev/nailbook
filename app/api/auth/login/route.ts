import { NextResponse } from "next/server";
import { loginSchema } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { email, password } = result.data;

  // Felhasználó keresése
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Ne áruljuk el, hogy az email vagy a jelszó hibás
  if (!user || !user.passwordHash) {
    return NextResponse.json(
      {
        success: false,
        message: "Hibás e-mail cím vagy jelszó.",
      },
      { status: 401 },
    );
  }

  // Jelszó ellenőrzése
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return NextResponse.json(
      {
        success: false,
        message: "Hibás e-mail cím vagy jelszó.",
      },
      { status: 401 },
    );
  }

  // Sikeres bejelentkezés
  return NextResponse.json(
    {
      success: true,
      message: "Sikeres bejelentkezés.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    { status: 200 },
  );
}
