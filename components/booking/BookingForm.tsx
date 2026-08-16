"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Clock3 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCreateAppointment } from "@/hooks/useCreateAppointment";
import { useServices } from "@/hooks/useServices";
import { bookingSchema, type BookingFormValues } from "@/schemas/booking";
import { getServiceImage } from "@/lib/service-images";

import DatePicker from "./BookingCalendar";
import TimeSlots from "./TimeSlots";
import BookingNote from "./BookingNote";
import BookingSummary from "./BookingSummary";

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createAppointment = useCreateAppointment();

  const { data: services, isPending: servicesLoading } = useServices();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: "",
      date: undefined,
      slot: "",
      note: "",
    },
  });

  const selectedServiceId = searchParams.get("service");

  const activeServiceId = useWatch({
    control: form.control,
    name: "serviceId",
  });

  const selectedService = services?.find((service) => service.id === activeServiceId);

  useEffect(() => {
    if (selectedServiceId) {
      form.setValue("serviceId", selectedServiceId, {
        shouldValidate: true,
      });
    }
  }, [selectedServiceId, form]);

  function selectService(id: string) {
    form.setValue("serviceId", id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    form.resetField("date");

    form.setValue("slot", "", {
      shouldDirty: true,
    });

    router.replace(`/booking?service=${encodeURIComponent(id)}`, {
      scroll: false,
    });
  }

  async function onSubmit(data: BookingFormValues) {
    try {
      await createAppointment.mutateAsync({
        serviceId: data.serviceId,
        startTime: new Date(data.slot),
        note: data.note,
      });

      toast.success("Sikeresen lefoglaltad az időpontot.");

      router.push("/booking/success");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nem sikerült lefoglalni az időpontot.");
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
        {/* Fejléc */}
        <div>
          <p className="hidden">Időpontfoglalás</p>

          <h2 className="mt-2 font-serif text-3xl text-stone-800 sm:text-4xl">
            Válassz egy kis énidőt.
          </h2>

          <p className="mt-3 text-stone-600">
            Néhány lépés, és máris megtaláljuk a neked megfelelő időpontot.
          </p>
        </div>

        {/* 1. lépés */}
        <section>
          <p className="eyebrow">1. lépés</p>

          <h3 className="mt-2 font-serif text-2xl text-stone-800 sm:text-3xl">
            Válassz szolgáltatást
          </h3>

          <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesLoading ? (
              <p className="text-sm text-stone-500">Szolgáltatások betöltése...</p>
            ) : (
              services?.map((service) => {
                const selected = activeServiceId === service.id;

                const imageSource = getServiceImage(service.id, service.image);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => selectService(service.id)}
                    className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-0 text-left align-top shadow-[0_18px_42px_-34px_rgba(74,49,38,.7)] transition-all duration-500 ${
                      selected
                        ? "border-[#a97967] bg-[#f3e8e1] shadow-[0_20px_45px_-32px_rgba(111,69,50,.8)]"
                        : "border-stone-200/90 bg-[#fffdfa] hover:-translate-y-1 hover:border-[#c39a89] hover:bg-[#fdfaf7] hover:shadow-[0_24px_52px_-32px_rgba(74,49,38,.5)]"
                    }`}
                  >
                    {/* Szolgáltatás képe */}
                    <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#efe4dc] sm:h-56 lg:h-52">
                      {/* Háttérkép - kitölti a teljes keretet */}
                      {/* Fő kép - enyhén távolabb */}
                      <Image
                        src={imageSource}
                        alt={service.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Kártya tartalma */}
                    <div className="flex w-full flex-1 flex-col p-5">
                      <p className="font-serif text-xl text-stone-800">{service.name}</p>

                      {/* Egységes hely a leírásnak */}
                      <div className="min-h-11">
                        {service.description && (
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                            {service.description}
                          </p>
                        )}
                      </div>

                      {/* Ár + idő */}
                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-between border-t border-stone-200/80 pt-3 text-sm">
                          <span className="font-semibold text-[#8f6252]">
                            {service.price.toLocaleString("hu-HU")} Ft
                          </span>

                          <span className="text-stone-500">{service.duration} perc</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </section>

        {/* Kiválasztott szolgáltatás */}
        {selectedService && (
          <div className="rounded-2xl border border-[#dcc7bb] bg-[#fffdfa] p-3 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={getServiceImage(selectedService.id, selectedService.image)}
                  alt={selectedService.name}
                  fill
                  sizes="96px"
                  className="object-cover object-center"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-[#a97967]">
                  Kiválasztott szolgáltatás
                </p>

                <h3 className="mt-1 text-lg font-semibold text-stone-800">
                  {selectedService.name}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-stone-600">
                  <span>{selectedService.price.toLocaleString("hu-HU")} Ft</span>

                  <span className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    {selectedService.duration} perc
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DatePicker />

        <TimeSlots />

        <BookingNote />

        <BookingSummary isPending={createAppointment.isPending} />
      </form>
    </FormProvider>
  );
}
