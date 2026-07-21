"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function AuthMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="text-sm text-gray-500">
        Betöltés...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-lg border border-pink-500 px-4 py-2 text-pink-600 transition hover:bg-pink-50"
        >
          Bejelentkezés
        </Link>

        <Link
          href="/register"
          className="rounded-lg bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600"
        >
          Regisztráció
        </Link>
      </div>
    );
  }

  return <UserMenu />;
}