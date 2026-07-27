import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";

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
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={clsx(
            "flex h-14 w-14 items-center justify-center rounded-2xl",
            color
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}