"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  Sun,
  Users,
  UserRound,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menu = [
  { href: "/admin", label: "Áttekintés", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "Naptár", icon: CalendarDays },
  { href: "/admin/customers", label: "Vendégek", icon: Users },
  { href: "/admin/services", label: "Szolgáltatások", icon: Scissors },
  { href: "/admin/opening-hours", label: "Nyitvatartás", icon: Clock3 },
  { href: "/admin/vacations", label: "Szabadságok", icon: Sun },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-stone-200 bg-[#fffdfa] px-5 py-7">
      <Link href="/admin" className="px-3 font-serif text-2xl tracking-[.12em] text-stone-800">
        NAILBOOK
        <span className="mt-1 block font-sans text-[10px] font-semibold uppercase tracking-[.22em] text-[#a97967]">
          Adminisztráció
        </span>
      </Link>
      <nav className="mt-10 space-y-1">
        {menu.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-[#eadbd2] text-[#7c5548]" : "text-stone-600 hover:bg-[#f8f5f1] hover:text-stone-800"}`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-1 border-t border-stone-200 pt-5">
        <Link
          href="/admin/profile"
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname.startsWith("/admin/profile") ? "bg-[#eadbd2] text-[#7c5548]" : "text-stone-600 hover:bg-[#f8f5f1] hover:text-stone-800"}`}
        >
          <UserRound className="size-4" />
          Profilom
        </Link>
        <Link
          href="/admin/settings"
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname.startsWith("/admin/settings") ? "bg-[#eadbd2] text-[#7c5548]" : "text-stone-600 hover:bg-[#f8f5f1] hover:text-stone-800"}`}
        >
          <Settings className="size-4" />
          Beállítások
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#8f6252] transition hover:bg-[#f8f5f1]"
        >
          <ExternalLink className="size-4" />
          Vissza a weboldalra
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-stone-500 transition hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="size-4" />
          Kijelentkezés
        </button>
      </div>
    </aside>
  );
}
