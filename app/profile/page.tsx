import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin/profile");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const profileUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? "",
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="flex items-start gap-4 border-b border-stone-200 pb-8">
        <div className="grid size-14 place-items-center rounded-full bg-[#eadbd2] text-[#8f6252]">
          <UserRound className="size-6" />
        </div>
        <div>
          <p className="eyebrow">Saját fiók</p>
          <h1 className="mt-2 font-serif text-4xl text-stone-800">Profilom</h1>
          <p className="mt-2 text-stone-600">Itt kezelheted személyes és belépési adataidat.</p>
        </div>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-2xl text-stone-800">Személyes adatok</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Módosítsd a nevedet vagy a telefonszámodat.
          </p>
          <ProfileForm user={profileUser} />
        </section>
        <section>
          <h2 className="font-serif text-2xl text-stone-800">Belépési adatok</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            A biztonság érdekében használj egyedi, legalább 8 karakteres jelszót.
          </p>
          <ChangePasswordForm />
        </section>
      </div>
    </main>
  );
}
