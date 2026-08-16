import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/app/profile/ProfileForm";
import ChangePasswordForm from "@/app/profile/ChangePasswordForm";

export default async function AdminProfilePage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin"
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#8f6252] transition hover:text-stone-800"
      >
        <ArrowLeft className="size-4" />
        Vissza az admin áttekintéshez
      </Link>
      <div className="flex items-start gap-4 border-b border-stone-200 pb-8">
        <div className="grid size-14 place-items-center rounded-full bg-[#eadbd2] text-[#8f6252]">
          <ShieldCheck className="size-6" />
        </div>
        <div>
          <p className="eyebrow">Adminisztráció</p>
          <h1 className="mt-2 font-serif text-4xl text-stone-800">Profilom</h1>
          <p className="mt-2 text-stone-600">Személyes adataid és belépési biztonságod kezelése.</p>
        </div>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-2xl text-stone-800">Személyes adatok</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Itt módosíthatod a megjelenő nevedet és telefonszámodat.
          </p>
          <ProfileForm
            user={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone ?? "",
            }}
          />
        </section>
        <section>
          <h2 className="font-serif text-2xl text-stone-800">Belépési adatok</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            A biztonság érdekében használj egyedi, legalább 8 karakteres jelszót.
          </p>
          <ChangePasswordForm />
        </section>
      </div>
    </div>
  );
}
