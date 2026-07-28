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
import { AppointmentModal } from "./AppointmentModal";

export function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments");

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
    void (async () => {
      await loadAppointments();
    })();
  }, [loadAppointments]);

  function handleSelect(selectInfo: DateSelectArg) {
    setSelectedAppointmentId(null);
    setSelectedDate(selectInfo.startStr);
    setOpen(true);
  }

  function handleEventClick(clickInfo: EventClickArg) {
    setSelectedAppointmentId(clickInfo.event.id);
    setSelectedDate(clickInfo.event.startStr);
    setOpen(true);
  }

  function handleAppointmentCreated() {
    setOpen(false);
    setSelectedDate(null);
    setSelectedAppointmentId(null);

    void loadAppointments();
  }

  function handleClose() {
    setOpen(false);
    setSelectedDate(null);
    setSelectedAppointmentId(null);
  }

  return (
    <>
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
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Ma",
            month: "Hónap",
            week: "Hét",
            day: "Nap",
          }}
          events={events}
        />
      </Card>

      <AppointmentModal
        open={open}
        selectedDate={selectedDate}
        appointmentId={selectedAppointmentId}
        onClose={handleClose}
        onSuccess={handleAppointmentCreated}
      />
    </>
  );
}