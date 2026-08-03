import { ReactNode } from "react";
import clsx from "clsx";

import { Card } from "@/components/ui/Card";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
};

export default function DashboardCard({
  title,
  value,
  icon,
  color = "bg-pink-100 text-pink-600",
}: DashboardCardProps) {
  return (
    <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={clsx(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl",
            color
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}