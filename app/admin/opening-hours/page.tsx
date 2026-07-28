import OpeningHoursForm from "@/components/admin/OpeningHoursForm";
import { getOpeningHours } from "@/lib/opening-hours";

export default async function OpeningHoursPage() {
  const openingHours = await getOpeningHours();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nyitvatartás</h1>
        <p className="text-sm text-neutral-500">
          Állítsd be a szalon heti nyitvatartását.
        </p>
      </div>

      <OpeningHoursForm openingHours={openingHours} />
    </div>
  );
}