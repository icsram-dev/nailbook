import Link from "next/link";
import { CircleCheck, CircleX, MailCheck } from "lucide-react";

type Props = { searchParams: Promise<{ success?: string }> };

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { success } = await searchParams;
  const verified = success === "true";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-4 py-10 sm:px-6">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffdfa] p-6 text-center shadow-[0_24px_60px_-40px_rgba(74,49,38,.55)] sm:p-8">
        <div className="absolute -right-16 -top-16 size-40 rounded-full border border-[#dcc7bb]" />
        <div className="relative">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#f3e8e1] text-[#8f6252]">
            {verified ? <CircleCheck className="size-7" /> : <CircleX className="size-7" />}
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[.22em] text-[#a97967]">
            Fiókbiztonság
          </p>
          <h1 className="mt-3 font-serif text-3xl text-stone-800 sm:text-4xl">
            {verified ? "E-mail cím megerősítve" : "Érvénytelen link"}
          </h1>
          <p className="mx-auto mt-3 max-w-sm leading-7 text-stone-600">
            {verified
              ? "Köszönjük! Az e-mail címedet sikeresen megerősítettük, a fiókod használatra kész."
              : "A megerősítő link érvénytelen, lejárt vagy már felhasználtad."}
          </p>
          <Link
            href={verified ? "/login" : "/register"}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#a97967] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8f6252]"
          >
            {verified ? <MailCheck className="size-4" /> : null}
            {verified ? "Bejelentkezés" : "Regisztráció"}
          </Link>
        </div>
      </div>
    </main>
  );
}
