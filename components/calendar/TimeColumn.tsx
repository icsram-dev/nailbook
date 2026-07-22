const slots = Array.from(
  { length: 24 },
  (_, i) => i
);

export function TimeColumn() {
  return (
    <div className="w-20 border-r bg-gray-50">
      {slots.map((slot) => {
        const totalMinutes = slot * 30;
        const hour = 8 + Math.floor(totalMinutes / 60);
        const minute = totalMinutes % 60;

        return (
          <div
            key={slot}
            className="h-10 border-b px-2 text-xs text-gray-500"
          >
            {hour.toString().padStart(2, "0")}:
            {minute.toString().padStart(2, "0")}
          </div>
        );
      })}
    </div>
  );
}