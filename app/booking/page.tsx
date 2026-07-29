import { redirect } from "next/navigation";

import { auth } from "@/auth";

import BookingForm from "@/components/booking/BookingForm";

export default async function BookingPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/booking");
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Online időpontfoglalás
        </h1>

        <p className="mt-2 text-muted-foreground">
          Válassz szolgáltatást és foglalj időpontot néhány kattintással.
        </p>
      </div>

      <BookingForm />
    </div>
  );
}