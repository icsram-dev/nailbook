"use client";

import { useQuery } from "@tanstack/react-query";

import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { getServices } from "@/lib/api/services";

export default function Services() {
  const {
    data: services,
    isPending,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  if (isPending) {
    return (
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Szolgáltatások
            </h2>

            <p className="mt-4 text-gray-600">
              Szolgáltatások betöltése...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Szolgáltatások
            </h2>

            <p className="mt-4 text-red-500">
              Nem sikerült betölteni a szolgáltatásokat.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const uniqueServices = services
    ? Array.from(
        services.reduce((map, service) => {
          const existing = map.get(service.name);

          if (!existing) {
            map.set(service.name, service);
          } else {
            map.set(service.name, {
              ...existing,
              price: Math.min(existing.price, service.price),
              duration: Math.min(
                existing.duration,
                service.duration
              ),
            });
          }

          return map;
        }, new Map<string, (typeof services)[number]>())
      ).map(([, service]) => service)
    : [];

  return (
    <section className="py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Szolgáltatások
          </h2>

          <p className="mt-4 text-gray-600">
            Válaszd ki a számodra megfelelő szolgáltatást.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {uniqueServices.map((service) => (
            <ServiceCard
              key={service.name}
              id={service.id}
              title={service.name}
              duration={`${service.duration} perctől`}
              price={`${service.price.toLocaleString("hu-HU")} Ft-tól`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}