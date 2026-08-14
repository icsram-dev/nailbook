import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Heart, ShieldCheck, Sparkles } from "lucide-react";

import Container from "@/components/ui/Container";
import Hero from "./Hero";

const reasons = [
  [Sparkles, "Személyre szabott", "A hozzád, alkalomhoz és stílusodhoz igazított gondos munka."],
  [Heart, "Énidő", "Nyugodt, kedves légkör, ahol megállhatsz egy pillanatra."],
  [CalendarDays, "Egyszerű foglalás", "Válassz szabad időpontot kényelmesen, online."],
  [ShieldCheck, "Tiszta környezet", "Higiénikus, igényes vendégtér és megbízható alapanyagok."],
] as const;

const gallery = [
  { src: "/images/gallery-milky-nude.png", alt: "Tejes nude manikűr" },
  { src: "/images/gallery-cherry-red.png", alt: "Cseresznyepiros manikűr" },
  { src: "/images/gallery-blush-flower.png", alt: "Púderrózsaszín manikűr" },
  { src: "/images/gallery-mocha.png", alt: "Mokka árnyalatú manikűr" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="relative py-16 sm:py-22">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[#f8f5f1]" />
        <Container>
          <div className="relative grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow">A NailBook élmény</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-stone-800 sm:text-4xl">
                Nem csak egy új szett. Egy új hangulat.
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-stone-600">
                A gondosan kiválasztott árnyalatok, finom formák és a rád figyelő idő teszi igazán különlegessé.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {reasons.map(([Icon, title, text], index) => (
                <article key={title} className={index === 1 ? "sm:translate-y-6" : ""}>
                  <span className="font-serif text-4xl text-[#d9c1b5]">0{index + 1}</span>
                  <div className="mt-2 border-t border-[#c9ad9f] pt-4">
                    <Icon className="size-5 text-[#a97967]" />
                    <h3 className="mt-4 font-serif text-xl text-stone-800">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-[#3e302b] py-16 text-[#fffdfa] sm:py-22">
        <Container>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#d9b4a1]">Galéria</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Hangulatok, amik megmaradnak.</h2>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map(({ src, alt }, index) => (
              <div
                key={src}
                className={`group relative aspect-[4/5] overflow-hidden rounded-[2rem] ${index % 2 ? "md:translate-y-5" : ""}`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#a97967] px-7 py-12 text-center text-white sm:px-12 sm:py-14">
            <div className="absolute -left-15 top-1/2 size-60 -translate-y-1/2 rounded-full border border-white/20" />
            <div className="absolute -right-15 -top-20 size-60 rounded-full border border-white/20" />
            <div className="relative">
              <p className="eyebrow text-[#f8e9de]">A te időd</p>
              <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">Készen állsz egy kis énidőre?</h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
                Foglalj időpontot néhány kattintással, és várd a következő gyönyörű részletet.
              </p>
              <Link href="/booking" className="mt-7 inline-block rounded-full bg-[#fffdfa] px-7 py-3.5 text-sm font-medium text-[#8f6252]">
                Időpontot foglalok
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
