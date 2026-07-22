"use client";

import { formatWeekRange } from "@/lib/calendar";

type WeekNavigatorProps = {
  currentWeek: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function WeekNavigator({
  currentWeek,
  onPrevious,
  onNext,
  onToday,
}: WeekNavigatorProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <button
        onClick={onPrevious}
        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        ← Előző
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={onToday}
          className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
        >
          Ma
        </button>

        <h2 className="text-lg font-semibold">
          {formatWeekRange(currentWeek)}
        </h2>
      </div>

      <button
        onClick={onNext}
        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        Következő →
      </button>
    </div>
  );
}