"use client";

import { useState } from "react";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const STATUS_LABELS = {
  PENDING: "Függőben",
  CONFIRMED: "Megerősítve",
  COMPLETED: "Teljesítve",
  CANCELLED: "Lemondva",
  NO_SHOW: "Nem jelent meg",
};

type CancellationReason = "CUSTOMER_CANCELLED" | "ADMIN_CANCELLED" | "OTHER";

type Appointment = {
  id: string;

  customerName: string;
  customerPhone?: string | null;
  customerEmail?: string | null;

  serviceName: string;
  duration: number;
  price: number;

  startTime: string;
  endTime: string;

  status: string;

  customerNote?: string | null;
  note?: string | null;
};

type Props = {
  open: boolean;
  appointment: Appointment | null;

  onClose: () => void;
  onEdit: () => void;

  onDelete: (reason: CancellationReason, note?: string) => void;

  onNoShow: () => void;
};

export function AppointmentDetailsModal({
  open,
  appointment,
  onClose,
  onEdit,
  onDelete,
  onNoShow,
}: Props) {
  const [showCancellationForm, setShowCancellationForm] = useState(false);

  const [reason, setReason] = useState<CancellationReason>("CUSTOMER_CANCELLED");

  const [note, setNote] = useState("");

  if (!appointment) return null;

  const appointmentStart = new Date(appointment.startTime);

  const isPast =
    // eslint-disable-next-line react-hooks/purity
    appointmentStart.getTime() < Date.now();

  const canMarkAsNoShow =
    isPast && (appointment.status === "PENDING" || appointment.status === "CONFIRMED");

  function handleCancel() {
    onDelete(reason, note.trim() || undefined);

    setShowCancellationForm(false);
    setNote("");
  }

  function handleClose() {
    setShowCancellationForm(false);
    setNote("");
    setReason("CUSTOMER_CANCELLED");

    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Foglalás részletei">
      <div className="space-y-6">
        {/* Vendég adatai */}
        <div>
          <h2 className="text-xl font-semibold">{appointment.customerName}</h2>

          <p className="text-gray-500">{appointment.customerPhone ?? "Nincs telefonszám"}</p>

          <p className="text-gray-500">{appointment.customerEmail ?? "Nincs e-mail"}</p>
        </div>

        {/* Szolgáltatás */}
        <div className="rounded-xl border p-4">
          <p>
            <strong>Szolgáltatás:</strong> {appointment.serviceName}
          </p>

          <p>
            <strong>Időtartam:</strong> {appointment.duration} perc
          </p>

          <p>
            <strong>Ár:</strong> {appointment.price.toLocaleString("hu-HU")} Ft
          </p>
        </div>

        {/* Időpont és státusz */}
        <div className="rounded-xl border p-4">
          <p>
            <strong>Kezdés:</strong>{" "}
            {appointmentStart.toLocaleString("hu-HU", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <strong>Befejezés:</strong>{" "}
            {new Date(appointment.endTime).toLocaleString("hu-HU", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <strong>Státusz:</strong>{" "}
            {STATUS_LABELS[appointment.status as keyof typeof STATUS_LABELS] ?? appointment.status}
          </p>
        </div>

        {/* Vendég megjegyzése */}
        {appointment.customerNote && (
          <div>
            <h4 className="font-semibold">Vendég megjegyzése</h4>

            <p className="mt-1 text-gray-600">{appointment.customerNote}</p>
          </div>
        )}

        {/* Belső megjegyzés */}
        {appointment.note && (
          <div>
            <h4 className="font-semibold">Belső megjegyzés</h4>

            <p className="mt-1 text-gray-600">{appointment.note}</p>
          </div>
        )}

        {/* Normál műveletek */}
        {!showCancellationForm ? (
          <div className="flex flex-wrap justify-end gap-3">
            {/* Jóváhagyás */}
            {/* Jóváhagyás kizárólag az Áttekintés oldalon érhető el. */}
            {false && appointment?.status === "PENDING" && (
              <Button
                type="button"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => undefined}
              >
                ✓ Jóváhagyás
              </Button>
            )}

            {/* Nem jelent meg */}
            {canMarkAsNoShow && (
              <Button
                type="button"
                className="border border-[#d9c3b8] bg-[#f3e8e1] text-[#6e4a3c] hover:bg-[#eadbd2]"
                onClick={onNoShow}
              >
                Nem jelent meg
              </Button>
            )}

            {/* Lemondás */}
            {appointment.status !== "CANCELLED" &&
              appointment.status !== "NO_SHOW" &&
              appointment.status !== "COMPLETED" && (
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => setShowCancellationForm(true)}
                >
                  Lemondás
                </Button>
              )}

            {/* Szerkesztés */}
            {appointment.status !== "CANCELLED" && appointment.status !== "NO_SHOW" && (
              <Button type="button" onClick={onEdit}>
                Szerkesztés
              </Button>
            )}
          </div>
        ) : (
          /* Lemondási űrlap */
          <div className="rounded-2xl border border-[#e3d5cc] bg-[#f9f4f0] p-5">
            <h3 className="font-serif text-xl font-normal text-stone-800">Foglalás lemondása</h3>

            <p className="mt-1 text-sm text-stone-600">Válaszd ki a lemondás okát.</p>

            <div className="mt-4 space-y-3">
              {/* Vendég lemondta */}
              <label className="flex cursor-pointer items-center gap-3 text-stone-700">
                <input
                  type="radio"
                  name="cancellationReason"
                  value="CUSTOMER_CANCELLED"
                  checked={reason === "CUSTOMER_CANCELLED"}
                  onChange={() => setReason("CUSTOMER_CANCELLED")}
                />

                <span>Vendég lemondta</span>
              </label>

              {/* Admin lemondta */}
              <label className="flex cursor-pointer items-center gap-3 text-stone-700">
                <input
                  type="radio"
                  name="cancellationReason"
                  value="ADMIN_CANCELLED"
                  checked={reason === "ADMIN_CANCELLED"}
                  onChange={() => setReason("ADMIN_CANCELLED")}
                />

                <span>Admin lemondta</span>
              </label>

              {/* Egyéb */}
              <label className="flex cursor-pointer items-center gap-3 text-stone-700">
                <input
                  type="radio"
                  name="cancellationReason"
                  value="OTHER"
                  checked={reason === "OTHER"}
                  onChange={() => setReason("OTHER")}
                />

                <span>Egyéb</span>
              </label>
            </div>

            {/* Megjegyzés */}
            <div className="mt-4">
              <label
                htmlFor="cancellation-note"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Megjegyzés <span className="font-normal text-stone-400">(opcionális)</span>
              </label>

              <textarea
                id="cancellation-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                placeholder="Pl. betegség, technikai ok..."
                className="w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2]"
              />
            </div>

            {/* Lemondás műveletei */}
            <div className="mt-5 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => {
                  setShowCancellationForm(false);
                  setNote("");
                  setReason("CUSTOMER_CANCELLED");
                }}
              >
                Mégse
              </Button>

              <Button
                type="button"
                className="bg-[#a97967] text-white hover:bg-[#8f6252]"
                onClick={handleCancel}
              >
                Lemondás megerősítése
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
