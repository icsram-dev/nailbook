import { Heart, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

export default function AboutPage() {
  const values = [
    [Sparkles, "Minőségi figyelem", "Az elképzelésedhez, életstílusodhoz és körmeid állapotához igazított szolgáltatás."],
    [Heart, "Nyugodt élmény", "Letisztult, barátságos környezet, ahol a részletekre is jut idő."],
    [Sparkles, "Időtálló stílus", "Finom, nőies és igényes körmök a hétköznapokra és a különleges alkalmakra."],
  ] as const;

  return <>
    <section className="bg-[#f3eee8] py-20 sm:py-28"><Container><p className="eyebrow">Rólam</p><div className="mt-5 grid items-center gap-12 lg:grid-cols-2"><div><h1 className="font-serif text-5xl leading-[1.05] text-stone-800 sm:text-6xl">A szépség a gondosan megélt részletekben van.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-stone-600">Hiszek abban, hogy egy körmös alkalom több, mint egy szolgáltatás: egy kis énidő, ahol csak rád figyelünk.</p></div><div className="aspect-[4/5] rounded-[2.5rem] border border-white/70 bg-[radial-gradient(circle_at_25%_20%,#fffdf9,transparent_28%),linear-gradient(135deg,#d9c3b7,#f8f2eb)] p-8 shadow-[0_30px_70px_-45px_rgba(74,49,38,.7)]"><div className="flex h-full items-end rounded-[1.8rem] border border-white/50 bg-white/25 p-7"><p className="font-serif text-3xl italic text-white/90">Itt lesz a saját portréd.</p></div></div></div></Container></section>
    <section className="py-20 sm:py-28"><Container><div className="grid gap-6 md:grid-cols-3">{values.map(([Icon, title, text]) => <article key={title} className="rounded-[2rem] bg-[#f8f5f1] p-8"><Icon className="size-5 text-[#a97967]"/><h2 className="mt-6 font-serif text-3xl text-stone-800">{title}</h2><p className="mt-3 leading-7 text-stone-600">{text}</p></article>)}</div></Container></section>
  </>;
}
