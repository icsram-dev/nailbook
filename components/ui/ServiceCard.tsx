"use client";

import Image from "next/image";
import Link from "next/link";
import { getServiceImage } from "@/lib/service-images";

type ServiceCardProps = {
  id: string;
  title: string;
  duration: string;
  price: string;
  image?: string | null;
  description?: string | null;

  selected?: boolean;
  onSelect?: () => void;
};

export default function ServiceCard({
  id,
  title,
  duration,
  price,
  image,
  description,
  selected = false,
  onSelect,
}: ServiceCardProps) {
  const imageSource = getServiceImage(id, image);

  const cardClassName = `
    group flex h-full w-full flex-col overflow-hidden
    rounded-2xl border p-0 text-left transition
    ${
      selected
        ? "border-[#a97967] bg-[#f3e8e1] shadow-sm"
        : "border-stone-200 bg-[#fffdfa] hover:border-[#c39a89] hover:bg-[#f8f5f1]"
    }
  `;

  const content = (
    <>
      {/* KÉP */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#f3e8e1] sm:h-56 lg:h-52">
        {/* Háttér */}
        <Image
          src={imageSource}
          alt=""
          fill
          aria-hidden="true"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center"
        />

        {/* Fő kép */}
        <Image
          src={imageSource}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="scale-[0.94] object-cover object-center transition-transform duration-500 group-hover:scale-[0.97]"
        />
      </div>

      {/* TARTALOM */}
      <div className="flex w-full flex-1 flex-col p-4">
        <p className="font-serif text-lg text-stone-800">
          {title}
        </p>

        <div className="min-h-11">
          {description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
              {description}
            </p>
          )}
        </div>

        {/* ÁR + IDŐ */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-sm">
            <span className="font-semibold text-[#8f6252]">
              {price}
            </span>

            <span className="text-stone-500">
              {duration}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  /*
   * BookingForm esetén gombként működik.
   */
  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cardClassName}
      >
        {content}
      </button>
    );
  }

  /*
   * Szolgáltatások részen normál link.
   */
  return (
    <Link
      href={`/booking?service=${encodeURIComponent(id)}`}
      className={cardClassName}
    >
      {content}
    </Link>
  );
}
