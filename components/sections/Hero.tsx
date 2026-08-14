"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Container from "@/components/ui/Container";

export default function Hero() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return <section className="relative overflow-hidden bg-[#eee4dc] py-14 sm:py-20"><div className="absolute -left-30 top-10 size-100 rounded-full border border-[#c39a89]/30"/><div className="absolute -bottom-45 left-[38%] size-130 rounded-full bg-[#d8bdaf]/35 blur-3xl"/><Container><div className="relative grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]"><div className="relative z-10 py-5 lg:py-12"><p className="eyebrow flex items-center gap-2"><Sparkles className="size-3"/>NailBook · beauty ritual</p><h1 className="mt-5 max-w-xl font-serif text-5xl leading-[.94] text-stone-800 sm:text-6xl xl:text-7xl">Egy kis <em className="font-normal text-[#a97967]">ragyogás,</em><br/>ami csak a tiéd.</h1><p className="mt-7 max-w-md text-lg leading-8 text-stone-600">Különleges körmök, nyugodt figyelem és a jól megérdemelt énidő — a mindennapok finom luxusa.</p>{!isAdmin && status !== "loading" && <div className="mt-9"><Link href="/booking" className="inline-flex rounded-full bg-[#a97967] px-6 py-4 text-sm font-medium text-white shadow-[0_15px_30px_-18px_rgba(86,48,35,.7)] transition hover:bg-[#8f6252]">Időpontfoglalás</Link></div>}<div className="mt-12 flex items-center gap-4 text-xs font-medium uppercase tracking-[.13em] text-stone-500"><span className="h-px w-12 bg-[#a97967]"/>Nőies · igényes · személyes</div></div><div className="relative mx-auto w-full max-w-2xl lg:translate-x-8"><div className="relative aspect-[4/5] overflow-hidden rounded-[46%_46%_2.5rem_2.5rem] shadow-[0_35px_70px_-35px_rgba(74,49,38,.65)]"><Image src="/images/nailbook-hero-salon.png" alt="Elegáns nude manikűr puha, bézs szalonhangulatban" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-tr from-[#684438]/20 via-transparent to-white/10"/></div></div></div></Container></section>;
}
