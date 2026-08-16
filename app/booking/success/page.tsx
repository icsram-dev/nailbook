import { Check } from "lucide-react";

export default function BookingSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-16">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#dcc7bb] bg-[#fffdfa] px-7 py-12 text-center shadow-[0_24px_60px_-40px_rgba(74,49,38,.55)] sm:px-12">
        <div className="absolute -left-16 -top-16 size-44 rounded-full border border-[#dcc7bb]" />
        <div className="absolute -bottom-20 -right-16 size-52 rounded-full bg-[#f3e8e1]" />
        <div className="relative">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#f3e8e1] text-[#8f6252]">
            <Check className="size-7" strokeWidth={1.8} />
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[.22em] text-[#a97967]">
            Foglalás rögzítve
          </p>
          <h1 className="mt-3 font-serif text-4xl text-stone-800 sm:text-5xl">
            Találkozunk hamarosan.
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-7 text-stone-600">
            A foglalásodat sikeresen rögzítettük. A részleteket visszaigazoló e-mailben elküldtük a
            megadott e-mail címre.
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-[#c39a89]" />
        </div>
      </div>
    </section>
  );
}
