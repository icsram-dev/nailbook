import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  getAppointmentStatusClasses,
  getAppointmentStatusLabel,
} from "@/lib/appointmentStatus";

export default async function MyBookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      customerId: session.user.id,
    },
    include: {
      service: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        Foglalásaim
      </h1>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            Még nincs foglalásod
          </h2>

          <p className="mt-2 text-gray-500">
            Foglalj időpontot a szolgáltatások közül.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {appointment.service.name}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {appointment.startTime.toLocaleDateString(
                      "hu-HU",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${getAppointmentStatusClasses(
                    appointment.status
                  )}`}
                >
                  {getAppointmentStatusLabel(
                    appointment.status
                  )}
                </span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Kezdés
                  </p>

                  <p className="font-semibold">
                    {appointment.startTime.toLocaleTimeString(
                      "hu-HU",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Befejezés
                  </p>

                  <p className="font-semibold">
                    {appointment.endTime.toLocaleTimeString(
                      "hu-HU",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Ár
                  </p>

                  <p className="font-semibold">
                    {appointment.price.toLocaleString(
                      "hu-HU"
                    )}{" "}
                    Ft
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}