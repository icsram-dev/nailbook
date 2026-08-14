import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-stone-200 bg-[#fffdfa] px-5 py-4 lg:hidden">
        <Link href="/admin" className="font-serif text-lg tracking-[.12em] text-stone-800">NAILBOOK</Link>
        <div className="flex gap-3 text-xs font-medium text-[#8f6252]"><Link href="/admin">Áttekintés</Link><Link href="/admin/profile">Profil</Link><Link href="/">Weboldal</Link></div>
      </div>
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <div className="hidden lg:block"><AdminSidebar /></div>

        <main className="min-w-0 flex-1 p-6 sm:p-10">
          <div className="mb-8 flex items-center justify-end border-b border-stone-200 pb-5 [&>a:first-child]:hidden">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-[#8f6252] transition hover:text-stone-800"><ArrowLeft className="size-4"/>Admin áttekintés</Link>
            <Link href="/" className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-[.12em] text-stone-600 transition hover:border-[#a97967] hover:text-[#8f6252]">Vissza a weboldalra</Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
