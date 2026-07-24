import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

export function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-pink-50 p-3 text-pink-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}