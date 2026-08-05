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

export function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");

const [detailsOpen, setDetailsOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);

const [selectedDate, setSelectedDate] = useState<string | null>(null);

const [selectedAppointmentId, setSelectedAppointmentId] =
  useState<string | null>(null);

const [selectedAppointment, setSelectedAppointment] =
  useState<any>(null);
const filteredEvents = events.filter((event) => {
  const customer =
    event.extendedProps?.customerName?.toLowerCase() ?? "";

  const service =
    event.extendedProps?.serviceName?.toLowerCase() ?? "";

  const phone =
    event.extendedProps?.customerPhone?.toLowerCase() ?? "";

  const email =
    event.extendedProps?.customerEmail?.toLowerCase() ?? "";

  const query = search.toLowerCase().trim();

  const matchesSearch =
    customer.includes(query) ||
    service.includes(query) ||
    phone.includes(query) ||
    email.includes(query);

  const matchesStatus =
    statusFilter === "ALL" ||
    event.extendedProps?.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const loadAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/appointments");

      if (!res.ok) {
        throw new Error("Nem sikerült betölteni a foglalásokat.");
      }

      const data = await res.json();

      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  function handleSelect(selectInfo: DateSelectArg) {
    setSelectedAppointmentId(null);
    setSelectedAppointment(null);

    setSelectedDate(selectInfo.startStr);

    setEditOpen(true);
  }

  function handleEventClick(clickInfo: EventClickArg) {
    setSelectedAppointmentId(clickInfo.event.id);
    setSelectedDate(clickInfo.event.startStr);

    setSelectedAppointment({
      id: clickInfo.event.id,

      customerName:
        clickInfo.event.extendedProps.customerName,

      customerPhone:
        clickInfo.event.extendedProps.customerPhone,

      customerEmail:
        clickInfo.event.extendedProps.customerEmail,

      serviceName:
        clickInfo.event.extendedProps.serviceName,

      duration:
        clickInfo.event.extendedProps.duration,

      price:
        clickInfo.event.extendedProps.price,

      startTime: clickInfo.event.startStr,
      endTime: clickInfo.event.endStr,

      status:
        clickInfo.event.extendedProps.status,

      customerNote:
        clickInfo.event.extendedProps.customerNote,

      note:
        clickInfo.event.extendedProps.internalNote,
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

  async function handleDelete() {
    if (!selectedAppointmentId) return;

    const confirmed = window.confirm(
      "Biztosan le szeretnéd mondani ezt a foglalást?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/appointments/${selectedAppointmentId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Nem sikerült törölni a foglalást."
        );
      }

      handleClose();

      await loadAppointments();
    } catch (error) {
      console.error(error);

      alert("Hiba történt a törlés során.");
    }
  }

  return (
    <> <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  <div className="w-full max-w-md">
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder="Keresés vendég, telefonszám, e-mail vagy szolgáltatás alapján..."
    />
  </div>

  <div className="flex flex-wrap gap-2">
    {[
      { label: "Összes", value: "ALL" },
      { label: "Függőben", value: "PENDING" },
      { label: "Jóváhagyott", value: "CONFIRMED" },
      { label: "Befejezett", value: "COMPLETED" },
      { label: "Lemondott", value: "CANCELLED" },
    ].map((item) => (
      <button
        key={item.value}
        type="button"
        onClick={() => setStatusFilter(item.value)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          statusFilter === item.value
            ? "bg-pink-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {item.label}
      </button>
    ))}
  </div>
</div>
      <Card className="overflow-hidden">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          locale={huLocale}
          initialView="timeGridWeek"
          firstDay={1}
          nowIndicator
          editable={false}
          selectable
          select={handleSelect}
          eventClick={handleEventClick}
          weekends
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          slotDuration="00:30:00"
          height="auto"
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
          events={filteredEvents}
          eventContent={(eventInfo) => {
            const { customerName } =
              eventInfo.event.extendedProps;

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