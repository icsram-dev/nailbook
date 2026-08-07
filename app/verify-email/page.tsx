import Link from "next/link";

type Props = {
  searchParams: Promise<{
    success?: string;
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: Props) {
  const { success } = await searchParams;

  const verified = success === "true";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-6">
      <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
        {verified ? (
          <>
            <div className="mb-4 text-6xl">✅</div>

            <h1 className="mb-3 text-3xl font-bold">
              E-mail cím megerősítve
            </h1>

            <p className="mb-8 text-gray-600">
              Köszönjük! Az e-mail címed sikeresen
              megerősítettük.
            </p>

            <Link
              href="/login"
              className="inline-flex rounded-xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700"
            >
              Bejelentkezés
            </Link>
          </>
        ) : (
          <>
            <div className="mb-4 text-6xl">❌</div>

            <h1 className="mb-3 text-3xl font-bold">
              Érvénytelen link
            </h1>

            <p className="mb-8 text-gray-600">
              A megerősítő link érvénytelen vagy már fel lett használva.
            </p>

            <Link
              href="/register"
              className="inline-flex rounded-xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700"
            >
              Regisztráció
            </Link>
          </>
        )}
      </div>
    </main>
  );
}