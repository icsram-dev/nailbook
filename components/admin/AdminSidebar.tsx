import Link from "next/link";

const menu = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "📊",
  },
  {
    href: "/admin/calendar",
    label: "Naptár",
    icon: "📅",
  },
  {
    href: "/admin/appointments",
    label: "Foglalások",
    icon: "📋",
  },
  {
    href: "/admin/customers",
    label: "Vendégek",
    icon: "👥",
  },
  {
    href: "/admin/services",
    label: "Szolgáltatások",
    icon: "💅",
  },
  {
    href: "/admin/settings",
    label: "Beállítások",
    icon: "⚙️",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">
      <h2 className="mb-8 text-2xl font-bold text-pink-600">
        💅 NailBook Admin
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-pink-50 hover:text-pink-600"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}