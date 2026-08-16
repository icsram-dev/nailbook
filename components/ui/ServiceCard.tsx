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
    rounded-[1.75rem] border p-0 text-left shadow-[0_18px_42px_-34px_rgba(74,49,38,.7)] transition-all duration-500
    ${
      selected
        ? "border-[#a97967] bg-[#f3e8e1] shadow-[0_20px_45px_-32px_rgba(111,69,50,.8)]"
        : "border-stone-200/90 bg-[#fffdfa] hover:-translate-y-1 hover:border-[#c39a89] hover:bg-[#fdfaf7] hover:shadow-[0_24px_52px_-32px_rgba(74,49,38,.5)]"
    }
  `;

  const content = (
    <>
      {/* KÉP */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#efe4dc] sm:h-56 lg:h-52">
        {/* Háttér */}
        {/* Fő kép */}
        <Image
          src={imageSource}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* TARTALOM */}
      <div className="flex w-full flex-1 flex-col p-5">
        <p className="font-serif text-xl text-stone-800">{title}</p>

        <div className="min-h-11">
          {description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{description}</p>
          )}
        </div>

        {/* ÁR + IDŐ */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-stone-200/80 pt-3 text-sm">
            <span className="font-semibold text-[#8f6252]">{price}</span>

            <span className="text-stone-500">{duration}</span>
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
      <button type="button" onClick={onSelect} className={cardClassName}>
        {content}
      </button>
    );
  }

  /*
   * Szolgáltatások részen normál link.
   */
  return (
    <Link href={`/booking?service=${encodeURIComponent(id)}`} className={cardClassName}>
      {content}
    </Link>
  );
}
