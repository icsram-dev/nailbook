"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDown, User } from "lucide-react";
import UserMenu from "./UserMenu";

export default function AuthMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        aria-busy="true"
        aria-label="Fiók betöltése"
        className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 text-stone-700"
      >
        <User size={18} aria-hidden="true" />
        <span className="font-medium">Fiókom</span>
        <ChevronDown size={16} aria-hidden="true" />
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
