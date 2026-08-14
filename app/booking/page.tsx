import { redirect } from "next/navigation";

import { auth } from "@/auth";

import BookingForm from "@/components/booking/BookingForm";

export default async function BookingPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/booking");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return <main className="relative isolate overflow-hidden bg-[#fffdfa]"><div aria-hidden className="pointer-events-none absolute -left-48 top-20 size-[34rem] rounded-full border border-[#dec7bc]/60"/><div aria-hidden className="pointer-events-none absolute -right-36 top-1/3 size-[30rem] rounded-full bg-[#f3e8e1]/70 blur-3xl"/><div aria-hidden className="pointer-events-none absolute bottom-28 left-1/2 size-80 -translate-x-1/2 rounded-full border border-[#e3d0c5]"/><div className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16"><BookingForm /></div></main>;
}
