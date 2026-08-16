"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import AuthMenu from "./AuthMenu";
import BrandLogo from "./BrandLogo";

const links = [
  { href: "/", label: "Kezdőlap" },
  { href: "/services", label: "Szolgáltatások" },
  { href: "/gallery", label: "Galéria" },
  { href: "/about", label: "Rólam" },
  { href: "/house-rules", label: "Házirend" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isBooking = pathname.startsWith("/booking");

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdfa]/90 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="inline-flex" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.12em] text-stone-600 xl:gap-6 xl:text-xs lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-3 transition hover:text-[#a97967] ${isActive(link.href) ? "text-[#8f6252] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[#a97967]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className={`rounded-full bg-[#a97967] px-5 py-3 text-white transition hover:bg-[#8f6252] ${isBooking ? "ring-2 ring-[#dcc7bb] ring-offset-2 ring-offset-[#fffdfa]" : ""}`}
          >
            Időpontfoglalás
          </Link>
        </nav>

        <div className="hidden lg:block">
          <AuthMenu />
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center text-stone-700 lg:hidden"
          aria-expanded={open}
          aria-label="Menü"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-[#fffdfa] px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-2 text-sm font-medium text-stone-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 transition ${isActive(link.href) ? "bg-[#f3e8e1] text-[#8f6252]" : "hover:bg-[#f8f5f1]"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={`mt-2 rounded-full bg-[#a97967] px-5 py-3 text-center text-white ${isBooking ? "ring-2 ring-[#dcc7bb] ring-offset-2" : ""}`}
              onClick={() => setOpen(false)}
            >
              Időpontfoglalás
            </Link>
          </nav>
          <div className="mt-5 border-t border-stone-200 pt-5">
            <AuthMenu />
          </div>
        </div>
      )}
    </header>
  );
}
