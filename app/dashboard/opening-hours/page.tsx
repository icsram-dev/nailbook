import { OpeningHoursForm } from "@/components/opening-hours/OpeningHoursForm";
import { getOpeningHours } from "@/lib/opening-hours";

export default async function OpeningHoursPage() {
  const openingHours = await getOpeningHours();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Nyitvatartás
        </h1>

        <p className="mt-2 text-gray-500">
          Állítsd be, hogy mely napokon és milyen időpontban vagy nyitva.
        </p>
      </div>

      <OpeningHoursForm openingHours={openingHours} />
    </div>
  );
}