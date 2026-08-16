"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import LoadingState from "@/components/common/LoadingState";
import { useServices } from "@/hooks/useServices";

export default function ServicesPage() {
  const { data: services, isPending, error } = useServices();

  return (
    <main className="relative isolate overflow-hidden bg-[#fffdfa]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-44 top-24 size-[34rem] rounded-full border border-[#dec7bc]/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 top-1/3 size-[28rem] rounded-full bg-[#f3e8e1]/65 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full border border-[#e3d0c5]"
      />
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="luxury-panel rounded-[2rem] px-6 py-10 text-center sm:px-10">
            <p className="eyebrow">NailBook ritual</p>
            <h1 className="mt-3 font-serif text-4xl text-stone-800 sm:text-5xl">Szolgáltatások</h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-600">
              Válaszd ki a számodra megfelelő szolgáltatást, majd foglalj egy számodra megfelelő
              időpontot.
            </p>
          </div>

          {isPending && (
            <div className="mt-12">
              <LoadingState rows={3} />
            </div>
          )}

          {error && (
            <div className="mt-12 text-center">
              <p className="text-sm text-red-500">Nem sikerült betölteni a szolgáltatásokat.</p>
            </div>
          )}

          {!isPending && !error && services && services.length > 0 && (
            <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.name}
                  duration={`${service.duration} perc`}
                  price={`${service.price.toLocaleString("hu-HU")} Ft`}
                  image={service.image}
                  description={service.description}
                />
              ))}
            </div>
          )}

          {!isPending && !error && (!services || services.length === 0) && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">Jelenleg még nincs foglalható szolgáltatás.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
