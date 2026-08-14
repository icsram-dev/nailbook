"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtSign, Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return <footer className="border-t border-stone-200 bg-[#f3eee8] py-14"><Container><div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><Link href="/" className="font-serif text-2xl tracking-[0.12em] text-stone-800">NAILBOOK</Link><p className="mt-4 max-w-sm leading-7 text-stone-600">Egy kis énidő, finom részletek és körmök, amelyek igazán téged tükröznek.</p></div><div><p className="eyebrow">Navigáció</p><div className="mt-4 flex flex-col gap-3 text-sm text-stone-600"><Link href="/services">Szolgáltatások</Link><Link href="/gallery">Galéria</Link><Link href="/about">Rólam</Link></div></div><div><p className="eyebrow">Kapcsolat</p><div className="mt-4 space-y-3 text-sm text-stone-600"><p className="flex items-center gap-2"><MapPin className="size-4 text-[#a97967]"/>Cím hamarosan</p><p className="flex items-center gap-2"><Mail className="size-4 text-[#a97967]"/>E-mail hamarosan</p><p className="flex items-center gap-2"><AtSign className="size-4 text-[#a97967]"/>Instagram hamarosan</p></div></div></div><p className="mt-12 border-t border-stone-200 pt-6 text-center text-xs text-stone-500">© {new Date().getFullYear()} NailBook. Minden jog fenntartva.</p></Container></footer>;
}
