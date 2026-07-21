"use client";

import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  User,
  CalendarDays,
  LogOut,
  ChevronDown,
  Shield,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const isAdmin = session.user.role === "ADMIN";

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 transition hover:bg-gray-50">
        <User size={18} />
        <span className="font-medium">
          {session.user.name}
        </span>
        <ChevronDown size={16} />
      </MenuButton>

      <MenuItems className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-xl focus:outline-none">
        {isAdmin && (
          <MenuItem>
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition data-[focus]:bg-pink-50"
            >
              <Shield size={18} />
              <span>Admin felület</span>
            </Link>
          </MenuItem>
        )}

        <MenuItem>
          <Link
            href="/my-bookings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition data-[focus]:bg-pink-50"
          >
            <CalendarDays size={18} />
            <span>Foglalásaim</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition data-[focus]:bg-pink-50"
          >
            <User size={18} />
            <span>Profil</span>
          </Link>
        </MenuItem>

        <hr className="my-2 border-gray-200" />

        <MenuItem>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-600 transition data-[focus]:bg-red-50"
          >
            <LogOut size={18} />
            <span>Kijelentkezés</span>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}