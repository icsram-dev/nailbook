"use client";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getAvailability, TimeSlot } from "@/lib/api/availability";
import type { BookingFormValues } from "@/schemas/booking";
export default function TimeSlots() {
  const { watch, setValue } = useFormContext<BookingFormValues>();
  const serviceId = watch("serviceId");
  const date = watch("date");
  const selectedSlot = watch("slot");
  const {
    data: slots = [],
    isPending,
    error,
  } = useQuery<TimeSlot[]>({
    queryKey: ["availability", serviceId, date?.toISOString()],
    queryFn: () => (date ? getAvailability({ serviceId, date }) : []),
    enabled: Boolean(serviceId && date),
  });
  const availableSlots = slots.filter((item) => item.available);
  return (
    <div className="rounded-2xl border border-stone-200 bg-[#fffdfa] p-6">
      <h3 className="mb-2 font-serif text-2xl text-stone-800">3. Válassz időpontot</h3>
      {!serviceId || !date ? (
        <p className="text-sm text-stone-500">Először válassz szolgáltatást és dátumot.</p>
      ) : isPending ? (
        <p className="text-sm text-stone-500">Szabad időpontok betöltése...</p>
      ) : error ? (
        <p className="text-sm text-red-600">Nem sikerült lekérni a szabad időpontokat.</p>
      ) : availableSlots.length === 0 ? (
        <p className="text-sm text-stone-500">Erre a napra már nincs foglalható időpont.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {availableSlots.map((item) => {
            const selected = selectedSlot === item.start;
            return (
              <button
                key={item.start}
                type="button"
                onClick={() =>
                  setValue("slot", item.start, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
                className={`rounded-xl border px-4 py-3 text-sm transition ${selected ? "border-[#a97967] bg-[#f3e8e1] text-[#7c5548]" : "border-stone-200 hover:border-[#c39a89] hover:bg-[#f8f5f1]"}`}
              >
                {new Date(item.start).toLocaleTimeString("hu-HU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
