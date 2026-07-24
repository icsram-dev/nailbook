import { getTimeSlots } from "@/lib/calendar";

type TimeColumnProps = {
  startHour?: number;
  endHour?: number;
};

export function TimeColumn({
  startHour,
  endHour,
}: TimeColumnProps) {
  const slots = getTimeSlots(
    startHour,
    endHour
  );

  return (
    <div className="w-20 border-r bg-gray-50">
      {slots.map((slot) => (
        <div
          key={slot.index}
          className="h-10 border-b px-2 text-xs text-gray-500"
        >
          {slot.label}
        </div>
      ))}
    </div>
  );
}