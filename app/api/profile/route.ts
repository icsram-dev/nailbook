import { NextResponse } from "next/server";
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

  const { name, phone } = body;

  if (!name || name.trim().length < 2) {
    return NextResponse.json(
      {
        success: false,
        message: "Adj meg egy érvényes nevet.",
      },
      {
        status: 400,
      }
    );
  }

  const phoneRegex =
    /^\+36\s(20|30|31|50|70)\s\d{3}\s\d{4}$/;

  if (phone && !phoneRegex.test(phone)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "A telefonszám formátuma: +36 30 358 0496",
      },
      {
        status: 400,
      }
    );
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: name.trim(),
      phone: phone.trim(),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Profil sikeresen frissítve.",
  });
}