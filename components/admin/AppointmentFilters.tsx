"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppointmentStatus } from "@prisma/client";

export default function AppointmentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/admin/appointments?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

        <input
          type="text"
          defaultValue={searchParams.get("search") ?? ""}
          placeholder="Keresés vendég szerint..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-pink-500"
        />
      </div>

      <select
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);

          if (e.target.value) {
            params.set("status", e.target.value);
          } else {
            params.delete("status");
          }

          router.push(`/admin/appointments?${params.toString()}`);
        }}
        className="rounded-xl border border-gray-300 px-4 py-2"
      >
        <option value="">Összes státusz</option>

        <option value={AppointmentStatus.PENDING}>Függő</option>

        <option value={AppointmentStatus.CONFIRMED}>Megerősítve</option>

        <option value={AppointmentStatus.COMPLETED}>Befejezve</option>

        <option value={AppointmentStatus.CANCELLED}>Lemondva</option>

        <option value={AppointmentStatus.NO_SHOW}>Nem jelent meg</option>
      </select>
    </div>
  );
}
