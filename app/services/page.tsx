"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import Container from "@/components/ui/Container";
import LoadingState from "@/components/common/LoadingState";
import { useServices } from "@/hooks/useServices";

export default function ServicesPage() {
  const {
    data: services,
    isPending,
    error,
  } = useServices();

  return (
    <main>
      <section className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              Szolgáltatások
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Válaszd ki a számodra megfelelő szolgáltatást,
              majd foglalj egy számodra megfelelő időpontot.
            </p>
          </div>

          {isPending && (
            <div className="mt-12">
              <LoadingState rows={3} />
            </div>
          )}

          {error && (
            <div className="mt-12 text-center">
              <p className="text-sm text-red-500">
                Nem sikerült betölteni a szolgáltatásokat.
              </p>
            </div>
          )}

          {!isPending &&
            !error &&
            services &&
            services.length > 0 && (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          {!isPending &&
            !error &&
            (!services || services.length === 0) && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">
                  Jelenleg még nincs foglalható szolgáltatás.
                </p>
              </div>
            )}
        </Container>
      </section>
    </main>
  );
}