import Link from "next/link";
import {
  CalendarPlus,
  Users,
  Sparkles,
  CalendarDays,
} from "lucide-react";

const actions = [
  {
    title: "Új foglalás",
    href: "/dashboard/calendar",
    icon: CalendarPlus,
  },
  {
    title: "Vendégek",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Szolgáltatások",
    href: "/dashboard/services",
    icon: Sparkles,
  },
  {
    title: "Naptár",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
];

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Gyors műveletek
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-pink-300 hover:bg-pink-50"
            >
              <div className="rounded-lg bg-pink-100 p-3 text-pink-600">
                <Icon size={22} />
              </div>

              <span className="font-medium">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}