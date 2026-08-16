type Props = {
  title: string;
  value: string | number;
  icon?: string;
  color?: "pink" | "blue" | "green" | "red";
};

const colors = {
  pink: "bg-pink-50 text-pink-600",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  red: "bg-red-50 text-red-600",
};

export default function StatCard({ title, value, icon, color = "pink" }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        {icon && (
          <div className={`rounded-xl p-3 ${colors[color]}`}>
            <span className="text-2xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}
