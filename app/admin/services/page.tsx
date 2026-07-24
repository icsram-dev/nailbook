"use client";

import { useEffect, useState } from "react";
import {Input} from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Service = {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  active: boolean;
};

type ServiceForm = {
  name: string;
  description: string;
  duration: string;
  price: string;
};

export default function AdminServicesPage() {
  const [form, setForm] = useState<ServiceForm>({
    name: "",
    description: "",
    duration: "",
    price: "",
  });

  const [services, setServices] = useState<Service[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadServices() {
    const response = await fetch("/api/services");
    const data = await response.json();

    if (response.ok) {
      setServices(data.services);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setError("");

    const response = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Szolgáltatás sikeresen létrehozva!");

      setForm({
        name: "",
        description: "",
        duration: "",
        price: "",
      });

      await loadServices();
    } else {
      setError(data.message || "Hiba történt.");
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Szolgáltatás hozzáadása
      </h1>

      {message && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-100 p-3 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Szolgáltatás neve
          </label>

          <Input
            placeholder="Pl. Gél lakk"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Leírás
          </label>

          <Input
            placeholder="Rövid leírás..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Időtartam (perc)
            </label>

            <Input
              type="number"
              placeholder="Pl. 60"
              value={form.duration}
              onChange={(e) =>
                setForm({
                  ...form,
                  duration: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Ár (Ft)
            </label>

            <Input
              type="number"
              placeholder="Pl. 8000"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </div>
        </div>

        <Button type="submit">
          Szolgáltatás mentése
        </Button>
      </form>

      <hr className="my-10" />

      <h2 className="mb-6 text-2xl font-bold">
        Szolgáltatások
      </h2>

      {services.length === 0 ? (
        <p className="text-gray-500">
          Még nincs felvett szolgáltatás.
        </p>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {service.name}
                </h3>

                <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
                  {service.price.toLocaleString("hu-HU")} Ft
                </span>
              </div>

              {service.description && (
                <p className="mt-3 text-gray-600">
                  {service.description}
                </p>
              )}

              <p className="mt-3 text-sm text-gray-500">
                ⏱ {service.duration} perc
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}