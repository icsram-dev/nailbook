import OpeningHoursTable from "@/components/admin/opening-hours/OpeningHoursTable";

import { getOpeningHours } from "./actions";

export default async function OpeningHoursPage() {
  const openingHours = await getOpeningHours();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Nyitvatartás
        </h1>

        <p className="text-muted-foreground">
          Állítsd be, mely napokon fogadsz
          vendégeket.
        </p>
      </div>

      <OpeningHoursTable
        openingHours={openingHours}
      />
    </div>
  );
}