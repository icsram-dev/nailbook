"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Scissors,
  Settings,
  Sun,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/layout/BrandLogo";

const menu = [
  { href: "/admin", label: "Áttekintés", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "Naptár", icon: CalendarDays },
  { href: "/admin/customers", label: "Vendégek", icon: Users },
  { href: "/admin/services", label: "Szolgáltatások", icon: Scissors },
  { href: "/admin/opening-hours", label: "Nyitvatartás", icon: Clock3 },
  { href: "/admin/vacations", label: "Szabadságok", icon: Sun },
  { href: "/admin/profile", label: "Profilom", icon: UserRound },
  { href: "/admin/settings", label: "Beállítások", icon: Settings },
];

export default function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-stone-200 bg-[#fffdfa]/95 backdrop-blur lg:hidden">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4">
        <Link href="/admin" className="inline-flex">
          <BrandLogo compact />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-full text-stone-700 hover:bg-[#f3e8e1]"
          aria-label="Admin menü"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-stone-200 px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            {menu.map(({ href, label, icon: Icon }) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium ${active ? "bg-[#eadbd2] text-[#7c5548]" : "bg-[#f8f5f1] text-stone-700"}`}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 flex gap-2 border-t border-stone-200 pt-3 text-sm">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-[#8f6252]"
            >
              <ExternalLink className="size-4" />
              Weboldal
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f3e8e1] px-3 py-2.5 text-[#8f6252]"
            >
              <LogOut className="size-4" />
              Kilépés
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
