"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CustomerSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative mb-6 max-w-md">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Keresés név, email vagy telefonszám alapján..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-white py-3 pl-11 pr-4 shadow-sm outline-none transition focus:border-pink-500"
      />
    </div>
  );
}