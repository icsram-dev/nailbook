"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "./Button";

type ServiceCardProps = {
  id: string;
  title: string;
  duration: string;
  price: string;
};

export default function ServiceCard({
  id,
  title,
  duration,
  price,
}: ServiceCardProps) {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 text-4xl">💅</div>

      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {duration}
      </p>

      <p className="mt-4 text-2xl font-bold text-pink-600">
        {price}
      </p>

      {!isAdmin && (
        <div className="mt-6">
          <Link href={`/booking?service=${id}`}>
            <Button>
              Időpontot foglalok
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}