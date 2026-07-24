"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import huLocale from "@fullcalendar/core/locales/hu";
import type { DateSelectArg, EventInput } from "@fullcalendar/core";

import { Card } from "@/components/ui/Card";
import { AppointmentModal } from "./AppointmentModal";

export function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function handleSelect(selectInfo: DateSelectArg) {
    setSelectedDate(selectInfo.startStr);
    setOpen(true);
  }

  async function loadAppointments() {
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
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  function handleAppointmentCreated() {
    setOpen(false);
    setSelectedDate(null);
    loadAppointments();
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
        onClose={() => {
          setOpen(false);
          setSelectedDate(null);
        }}
        onSuccess={handleAppointmentCreated}
      />
    </>
  );
}