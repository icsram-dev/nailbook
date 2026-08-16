import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/admin";
import { updateEmailSettings } from "@/lib/settings";

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { emailNotifications } = await request.json();
  if (typeof emailNotifications !== "boolean")
    return NextResponse.json({ error: "Érvénytelen adat." }, { status: 400 });
  await updateEmailSettings(emailNotifications);
  return NextResponse.json({ success: true });
}
