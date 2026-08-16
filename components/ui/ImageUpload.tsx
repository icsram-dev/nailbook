"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  value?: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Nem sikerült feltölteni.");
      }

      onChange(data.imageUrl);
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Nem sikerült feltölteni a képet.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex h-56 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-pink-500 hover:bg-pink-50"
      >
        {uploading ? (
          <p className="text-gray-500">Feltöltés...</p>
        ) : value ? (
          <Image
            src={value}
            alt="Szolgáltatás"
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium">Kattints a kép kiválasztásához</p>

            <p className="mt-2 text-sm text-gray-500">JPG, PNG vagy WEBP</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            void upload(file);
          }
        }}
      />
    </div>
  );
}
