import {
  formatDate,
  formatDay,
  getWeekDays,
} from "@/lib/calendar";

type CalendarHeaderProps = {
  currentWeek: Date;
};

export function CalendarHeader({
  currentWeek,
}: CalendarHeaderProps) {
  const days = getWeekDays(currentWeek);

  return (
    <div className="grid flex-1 grid-cols-5">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className="border-r bg-gray-50 p-4 text-center last:border-r-0"
        >
          <p className="font-semibold capitalize">
            {formatDay(day)}
          </p>

          <p className="text-sm text-gray-500">
            {formatDate(day)}
          </p>
        </div>
      ))}
    </div>
  );
}