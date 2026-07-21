import Link from "next/link";
import AuthMenu from "./AuthMenu";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-semibold text-pink-600">
          💅 NailBook
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link href="/">Kezdőlap</Link>
          <Link href="/services">Szolgáltatások</Link>
          <Link href="/gallery">Galéria</Link>
          <Link href="/about">Rólam</Link>
          <Link href="/contact">Kapcsolat</Link>
        </nav>

        <AuthMenu />
      </div>
    </header>
  );
}