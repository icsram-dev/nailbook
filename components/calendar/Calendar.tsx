"use client";

import { useCallback, useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import huLocale from "@fullcalendar/core/locales/hu";

import type {
  DateSelectArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";

import { Card } from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";

import { AppointmentModal } from "./AppointmentModal";
import { AppointmentDetailsModal } from "./AppointmentDetailsModal";

type CancellationReason =
  | "CUSTOMER_CANCELLED"
  | "ADMIN_CANCELLED"
  | "OTHER";

type SelectedAppointment = {
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

export function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string | null>(null);

  const [selectedAppointment, setSelectedAppointment] =
    useState<SelectedAppointment | null>(null);

  const filteredEvents = events.filter((event) => {
    const customer =
      event.extendedProps?.customerName
        ?.toLowerCase() ?? "";

    const service =
      event.extendedProps?.serviceName
        ?.toLowerCase() ?? "";

    const phone =
      event.extendedProps?.customerPhone
        ?.toLowerCase() ?? "";

    const email =
      event.extendedProps?.customerEmail
        ?.toLowerCase() ?? "";

    const query = search.toLowerCase().trim();

    const matchesSearch =
      customer.includes(query) ||
      service.includes(query) ||
      phone.includes(query) ||
      email.includes(query);

    const matchesStatus =
      statusFilter === "ALL" ||
      event.extendedProps?.status ===
        statusFilter;

    return matchesSearch && matchesStatus;
  });

  const loadAppointments = useCallback(
    async () => {
      try {
        const res = await fetch(
          "/api/admin/appointments"
        );

        if (!res.ok) {
          throw new Error(
            "Nem sikerült betölteni a foglalásokat."
          );
        }

        const data = await res.json();

        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  function handleSelect(
    selectInfo: DateSelectArg
  ) {
    setSelectedAppointmentId(null);
    setSelectedAppointment(null);

    setSelectedDate(selectInfo.startStr);

    setEditOpen(true);
  }

  function handleEventClick(
    clickInfo: EventClickArg
  ) {
    setSelectedAppointmentId(
      clickInfo.event.id
    );

    setSelectedDate(
      clickInfo.event.startStr
    );

    setSelectedAppointment({
      id: clickInfo.event.id,

      customerName:
        clickInfo.event.extendedProps
          .customerName,

      customerPhone:
        clickInfo.event.extendedProps
          .customerPhone,

      customerEmail:
        clickInfo.event.extendedProps
          .customerEmail,

      serviceName:
        clickInfo.event.extendedProps
          .serviceName,

      duration:
        clickInfo.event.extendedProps
          .duration,

      price:
        clickInfo.event.extendedProps
          .price,

      startTime:
        clickInfo.event.startStr,

      endTime:
        clickInfo.event.endStr,

      status:
        clickInfo.event.extendedProps
          .status,

      customerNote:
        clickInfo.event.extendedProps
          .customerNote,

      note:
        clickInfo.event.extendedProps
          .internalNote,
    });

    setDetailsOpen(true);
  }

  function handleAppointmentCreated() {
    setEditOpen(false);

    setSelectedAppointment(null);
    setSelectedAppointmentId(null);
    setSelectedDate(null);

    void loadAppointments();
  }

  function handleClose() {
    setDetailsOpen(false);
    setEditOpen(false);

    setSelectedAppointment(null);
    setSelectedAppointmentId(null);
    setSelectedDate(null);
  }

  function handleEdit() {
    setDetailsOpen(false);
    setEditOpen(true);
  }

  async function handleConfirm() {
    if (!selectedAppointmentId) return;

    try {
      const res = await fetch(
        `/api/admin/appointments/${selectedAppointmentId}/confirm`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) {
        const data = await res.json();

        throw new Error(
          data.error ??
            "Nem sikerült jóváhagyni a foglalást."
        );
      }

      handleClose();

      await loadAppointments();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Nem sikerült jóváhagyni a foglalást."
      );
    }
  }

  async function handleDelete(
    reason: CancellationReason,
    note?: string
  ) {
    if (!selectedAppointmentId) return;

    try {
      const res = await fetch(
        `/api/appointments/${selectedAppointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason,
            note,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ??
            "Nem sikerült lemondani a foglalást."
        );
      }

      handleClose();

      await loadAppointments();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Hiba történt a lemondás során."
      );
    }
  }

  async function handleNoShow() {
    if (!selectedAppointmentId) return;

    const confirmed = window.confirm(
      "Biztosan nem jelent meg a vendég ezen az időponton?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/appointments/${selectedAppointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: "NO_SHOW",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ??
            "Nem sikerült a foglalást nem jelent meg státuszra állítani."
        );
      }

      handleClose();

      await loadAppointments();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Hiba történt a státusz módosítása során."
      );
    }
  }

  return (
    <>
      <Card>
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Keresés név, telefon, e-mail vagy szolgáltatás alapján..."
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:border-pink-500"
          >
            <option value="ALL">
              Összes státusz
            </option>

            <option value="PENDING">
              Függőben
            </option>

            <option value="CONFIRMED">
              Megerősítve
            </option>

            <option value="COMPLETED">
              Teljesítve
            </option>

            <option value="CANCELLED">
              Lemondva
            </option>

            <option value="NO_SHOW">
              Nem jelent meg
            </option>
          </select>
        </div>

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="timeGridWeek"
          locale={huLocale}
          selectable={true}
          select={handleSelect}
          eventClick={handleEventClick}
          events={filteredEvents}
          height="auto"
          nowIndicator={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Ma",
            month: "Hónap",
            week: "Hét",
            day: "Nap",
          }}
          eventContent={(eventInfo) => {
            const customerName =
              eventInfo.event.extendedProps
                ?.customerName ?? "";

            return (
              <div className="p-1 text-xs leading-tight">
                <div className="font-semibold">
                  {eventInfo.timeText}
                </div>

                <div className="truncate font-medium">
                  {customerName}
                </div>
              </div>
            );
          }}
        />
      </Card>

      <AppointmentDetailsModal
        open={detailsOpen}
        appointment={selectedAppointment}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onNoShow={handleNoShow}
        onConfirm={handleConfirm}
      />

      <AppointmentModal
        open={editOpen}
        selectedDate={selectedDate}
        appointmentId={selectedAppointmentId}
        onClose={handleClose}
        onSuccess={handleAppointmentCreated}
      />
    </>
  );
}