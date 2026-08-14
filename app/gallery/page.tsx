import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";

const works = [
  { src: "/images/gallery-milky-nude.png", alt: "Tejes nude manikűr", title: "Milky nude" },
  { src: "/images/gallery-cherry-red.png", alt: "Cseresznyepiros manikűr", title: "Cherry moment" },
  { src: "/images/gallery-blush-flower.png", alt: "Púderrózsaszín, virágos manikűr", title: "Soft blush" },
  { src: "/images/gallery-mocha.png", alt: "Mokka árnyalatú manikűr", title: "Mocha muse" },
  { src: "/images/nailbook-hero-salon.png", alt: "Elegáns nude manikűr szalonhangulatban", title: "Quiet luxury" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#eee4dc] py-11 sm:py-14">
        <div className="absolute -right-15 -top-20 size-60 rounded-full border border-[#c39a89]/40" />
        <Container>
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="eyebrow">Galéria</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-stone-800 sm:text-4xl">
              A legfrissebb kedvenceim.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
              Finom árnyalatok, apró részletek és személyes hangulatok — inspiráció a következő szettedhez.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#fffdfa] py-11 sm:py-14">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {works.map(({ src, alt, title }) => (
              <figure key={src} className="group relative overflow-hidden rounded-[1.5rem] bg-[#eadbd2]">
                <div className="aspect-[5/4]">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  {title}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-[#3e302b] px-7 py-9 text-center text-white sm:px-12 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#d9b4a1]">A következő szetted</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-serif text-2xl sm:text-3xl">Találjuk meg a hozzád illő árnyalatot.</h2>
            <Link href="/booking" className="mt-6 inline-block rounded-full bg-[#fffdfa] px-6 py-3 text-sm font-medium text-[#8f6252]">
              Időpontot foglalok
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
