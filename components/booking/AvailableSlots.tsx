"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type Props = {
  serviceId: string;
};

export default function AvailableSlots({ serviceId }: Props) {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }

    async function loadSlots() {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/availability?date=${date}&serviceId=${serviceId}`
        );

        const data = await response.json();

        if (response.ok) {
          setSlots(data.slots);
        } else {
          alert(data.message || "Nem sikerült betölteni az időpontokat.");
        }
      } catch (error) {
        console.error(error);
        alert("Hiba történt az időpontok betöltése közben.");
      } finally {
        setLoading(false);
      }
    }

    loadSlots();
  }, [date, serviceId]);

  async function bookAppointment() {
    if (!selectedSlot || !date) return;

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          date,
          time: selectedSlot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 A foglalás sikeres!");

        setSelectedSlot(null);

        // Frissítjük a szabad időpontokat,
        // hogy az új foglalás eltűnjön a listából
        const slotsResponse = await fetch(
          `/api/availability?date=${date}&serviceId=${serviceId}`
        );

        const slotsData = await slotsResponse.json();

        if (slotsResponse.ok) {
          setSlots(slotsData.slots);
        }
      } else {
        alert(data.message || "Hiba történt.");
      }
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        Időpont kiválasztása
      </h2>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Dátum
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      {!date && (
        <p className="text-gray-500">
          Először válassz egy dátumot.
        </p>
      )}

      {loading && (
        <p>Szabad időpontok betöltése...</p>
      )}

      {!loading && date && slots.length === 0 && (
        <p className="text-gray-500">
          Erre a napra nincs szabad időpont.
        </p>
      )}

      {!loading && slots.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-lg border px-4 py-3 transition ${
                  selectedSlot === slot
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "hover:border-pink-500 hover:bg-pink-50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {selectedSlot && (
            <div className="mt-8 rounded-lg border bg-pink-50 p-4">
              <p className="mb-4">
                📅 {date}
                <br />
                🕒 {selectedSlot}
              </p>

              <Button
                type="button"
                onClick={bookAppointment}
              >
                Foglalás megerősítése
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}