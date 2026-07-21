import { prisma } from "@/lib/prisma";
import OpeningHoursForm from "@/components/admin/OpeningHoursForm";

export default async function OpeningHoursPage() {
  const count = await prisma.openingHour.count();

  if (count === 0) {
    await prisma.openingHour.createMany({
      data: [
        {
          weekday: 1,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: false,
        },
        {
          weekday: 2,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: false,
        },
        {
          weekday: 3,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: false,
        },
        {
          weekday: 4,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: false,
        },
        {
          weekday: 5,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: false,
        },
        {
          weekday: 6,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: true,
        },
        {
          weekday: 7,
          opensAt: "08:00",
          closesAt: "17:00",
          isClosed: true,
        },
      ],
    });
  }

  const openingHours = await prisma.openingHour.findMany({
    orderBy: {
      weekday: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Nyitvatartás
      </h1>

      <OpeningHoursForm openingHours={openingHours} />
    </div>
  );
}