import { NextResponse } from "next/server";

import { auth } from "@/auth";

/** Returns a response when the current visitor is not an administrator. */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Bejelentkezés szükséges." },
      { status: 401 }
    );
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Nincs jogosultság." },
      { status: 403 }
    );
  }

  return null;
}
