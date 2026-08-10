import Link from "next/link";
import AuthMenu from "./AuthMenu";

export default function Navbar() {
  return <header className="border-b border-pink-100 bg-white"><div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-6"><Link href="/" className="shrink-0 text-2xl font-semibold text-pink-600">✦ NailBook</Link><nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex"><Link href="/" className="hover:text-pink-600">Kezdőlap</Link><Link href="/services" className="hover:text-pink-600">Szolgáltatások</Link><Link href="/gallery" className="hover:text-pink-600">Galéria</Link><Link href="/booking" className="hover:text-pink-600">Időpontfoglalás</Link><Link href="/about" className="hover:text-pink-600">Rólam</Link></nav><AuthMenu /></div></header>;
}
