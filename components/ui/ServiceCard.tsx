"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";

type ServiceCardProps = {
  id: string;
  title: string;
  duration: string;
  price: string;
  image?: string | null;
  description?: string | null;
};

export default function ServiceCard({
  id,
  title,
  duration,
  price,
  image,
  description,
}: ServiceCardProps) {
  return (
    <Link
      href={`/booking?service=${encodeURIComponent(id)}`}
      className="group block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Kép */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-pink-50">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Sparkles className="h-10 w-10 text-pink-300" />
          </div>
        )}

        {/* Finom overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Tartalom */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>

            {description && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                {description}
              </p>
            )}
          </div>

          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition-colors group-hover:bg-pink-600 group-hover:text-white">
  <ArrowRight className="h-4 w-4" />
</div>
        </div>

        {/* Ár + idő */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="rounded-full bg-pink-50 px-3 py-1.5 text-sm font-semibold text-pink-700">
            {price}
          </span>

          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Clock3 className="h-4 w-4" />
            {duration}
          </span>
        </div>
      </div>
    </Link>
  );
}