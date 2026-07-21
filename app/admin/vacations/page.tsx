import { getVacations } from "@/lib/vacations";

export default async function VacationsPage() {
  const vacations = await getVacations();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Szabadságok
      </h1>

      {vacations.length === 0 ? (
        <p className="text-gray-500">
          Még nincs felvett szabadság.
        </p>
      ) : (
        <div className="rounded-xl border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Kezdete</th>
                <th className="p-4 text-left">Vége</th>
                <th className="p-4 text-left">Megjegyzés</th>
              </tr>
            </thead>

            <tbody>
              {vacations.map((vacation) => (
                <tr
                  key={vacation.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {vacation.startDate.toLocaleDateString("hu-HU")}
                  </td>

                  <td className="p-4">
                    {vacation.endDate.toLocaleDateString("hu-HU")}
                  </td>

                  <td className="p-4">
                    {vacation.reason || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}