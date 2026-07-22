type DashboardCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

export function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500">
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
  );
}