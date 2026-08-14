import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AdminMobileNav from "@/components/admin/AdminMobileNav";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <AdminMobileNav />
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <div className="hidden lg:block"><AdminSidebar /></div>
        <main className="min-w-0 flex-1 p-4 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
