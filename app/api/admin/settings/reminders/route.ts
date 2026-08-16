import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/admin";
import { updateReminderSettings } from "@/lib/settings";

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { reminderEnabled, reminderDaysBefore } = await request.json();
  if (
    typeof reminderEnabled !== "boolean" ||
    !Number.isInteger(reminderDaysBefore) ||
    reminderDaysBefore < 1 ||
    reminderDaysBefore > 30
  )
    return NextResponse.json({ error: "Érvénytelen adat." }, { status: 400 });
  await updateReminderSettings(reminderEnabled, reminderDaysBefore);
  return NextResponse.json({ success: true });
}
