"use client";

import Image from "next/image";
import { Clock3, ArrowRight, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useServices } from "@/hooks/useServices";

import LoadingState from "@/components/common/LoadingState";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ServiceSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedService = searchParams.get("service");

  const { data: services, isPending, error } = useServices();

  if (isPending) {
    return <LoadingState rows={2} />;
  }

  if (error) {
    return <p className="text-sm text-red-500">Nem sikerült betölteni a szolgáltatásokat.</p>;
  }

  if (!services || services.length === 0) {
    return <p className="text-sm text-muted-foreground">Jelenleg nincs elérhető szolgáltatás.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const selected = selectedService === service.id;

        return (
          <Card
            key={service.id}
            onClick={() => {
              router.push(`/booking?service=${encodeURIComponent(service.id)}`);
            }}
            className={[
              "group cursor-pointer overflow-hidden rounded-3xl",
              "transition-all duration-300",
              "hover:-translate-y-1 hover:shadow-xl",
              selected ? "border-primary ring-2 ring-primary/20" : "border-gray-100",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Kép */}
            <div className="p-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-pink-50">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Sparkles className="h-10 w-10 text-pink-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Tartalom */}
            <div className="px-5 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>

                  {service.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Nyíl */}
                <div
                  className={[
                    "mt-1 flex h-9 w-9 shrink-0 items-center justify-center",
                    "rounded-full transition-colors duration-200",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
                  ].join(" ")}
                >
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Ár + idő */}
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <Badge variant="secondary">{service.price.toLocaleString("hu-HU")} Ft</Badge>

                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock3 className="h-4 w-4" />
                  {service.duration} perc
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
