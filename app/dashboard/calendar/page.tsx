import { Calendar } from "@/components/calendar/Calendar";


export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Naptár
      </h1>

      <Calendar />
    </div>
  );
}