import Link from "next/link";
import { CalendarDays, Droplets, Heart, Image as ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Hero from "./Hero";

const reasons = [
  { icon: Sparkles, title: "Prémium alapanyagok", text: "Tartós, igényes végeredmény kompromisszumok nélkül." },
  { icon: Heart, title: "Egyedi körmök", text: "A stílusodhoz és alkalomhoz igazított, személyes megjelenés." },
  { icon: CalendarDays, title: "Online időpontfoglalás", text: "Válassz szabad időpontot kényelmesen, néhány kattintással." },
  { icon: ShieldCheck, title: "Higiénikus környezet", text: "Tiszta, nyugodt és gondosan előkészített vendégtér." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">Miért engem válassz?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Kényeztető élmény, gyönyörű végeredmény.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
                <div className="grid size-11 place-items-center rounded-2xl bg-pink-100 text-pink-700"><Icon className="size-5" /></div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-rose-50 py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">Galéria</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Inspiráció a következő körmeidhez.</h2></div>
            <Link href="/gallery" className="font-medium text-pink-700 hover:text-pink-800">Teljes galéria →</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="grid aspect-square place-items-center rounded-3xl bg-gradient-to-br from-pink-200 via-rose-100 to-white text-pink-500 shadow-sm">
                <ImageIcon className="size-7" aria-label="Hamarosan érkezik referenciafotó" />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-[2rem] bg-pink-600 px-7 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16">
            <Droplets className="mx-auto size-7 text-pink-100" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Készen állsz az új körmeidre?</h2>
            <p className="mx-auto mt-4 max-w-xl text-pink-100">Foglalj időpontot online néhány kattintással!</p>
            <Link href="/booking" className="mt-8 inline-block"><Button size="lg" className="h-12 bg-white px-6 text-base text-pink-700 hover:bg-pink-50">Időpont foglalása</Button></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
