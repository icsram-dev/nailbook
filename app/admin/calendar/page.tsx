import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Calendar } from "@/components/calendar/Calendar";

export default function CalendarPage() {
  return (
    <>
      <AdminPageHeader title="Naptár" description="Foglalások kezelése." />

      <Calendar />
    </>
  );
}
