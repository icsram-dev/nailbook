"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function AuthMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="text-sm text-gray-500">
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-full border border-[#a97967] px-4 py-2 text-[#8f6252] transition hover:bg-[#f3e8e1]"
        >
          Bejelentkezés
        </Link>

        <Link
          href="/register"
          className="rounded-full bg-[#a97967] px-4 py-2 text-white transition hover:bg-[#8f6252]"
        >
          Regisztráció
        </Link>
      </div>
    );
  }

  return <UserMenu />;
}
