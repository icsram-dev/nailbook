import { CalendarClock, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

import Container from "@/components/ui/Container";

const rules = [
  {
    icon: CalendarClock,
    title: "Időpontfoglalás",
    text: "Az időpontod a visszaigazolás után válik véglegessé. Ha mégsem megfelelő az időpont, kérjük, minél előbb jelezd.",
  },
  {
    icon: HeartHandshake,
    title: "Lemondás és módosítás",
    text: "Az időpont díjmentesen legkésőbb 24 órával a kezdés előtt mondható le vagy módosítható. 24 órán belüli lemondás vagy meg nem jelenés esetén a szolgáltatás teljes díja fizetendő.",
  },
  {
    icon: Sparkles,
    title: "Érkezés",
    text: "Kérjük, érkezz pontosan. Késés esetén a következő vendégre való tekintettel az alkalom ideje rövidülhet, vagy új időpont egyeztetése válhat szükségessé.",
  },
  {
    icon: ShieldCheck,
    title: "Higiénia és egészség",
    text: "A biztonságos, igényes munka érdekében kérjük, előre jelezd, ha sérülés, fertőzés, allergia vagy más köröm- és bőrprobléma áll fenn.",
  },
];

export default function HouseRulesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#eee4dc] py-12 sm:py-16">
        <div className="absolute -left-16 bottom-0 size-64 rounded-full border border-[#c39a89]/35" />
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="eyebrow">Vendégtájékoztató</p>
            <h1 className="mt-3 font-serif text-3xl text-stone-800 sm:text-4xl">Házirend</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
              Néhány egyszerű irányelv azért, hogy minden alkalom nyugodt, kényelmes és igazán
              feltöltő legyen.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {rules.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="rounded-[1.5rem] border border-stone-200 bg-[#fffdfa] p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f3e8e1] text-[#8f6252]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[.18em] text-[#a97967]">
                      0{index + 1}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl text-stone-800">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-stone-500">
            Köszönjük, hogy figyelsz ezekre a közös keretekre — így a NailBook-élmény minden vendég
            számára harmonikus marad.
          </p>
        </Container>
      </section>
    </>
  );
}
