import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
};

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          {description && (
            <p className="mt-3 text-sm text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-pink-100 p-3">
          <Icon className="h-6 w-6 text-pink-600" />
        </div>
      </div>
    </div>
  );
}