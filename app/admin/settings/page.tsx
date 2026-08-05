import AdminPageHeader from "@/components/admin/AdminPageHeader";

import BookingSettings from "@/components/admin/settings/BookingSettings";
import EmailSettings from "@/components/admin/settings/EmailSettings";
import ReminderSettings from "@/components/admin/settings/ReminderSettings";

import { getSettings } from "@/lib/settings";

export default async function SettingsPage() {
  const settings = await getSettings();

  if (!settings) {
    return (
      <>
        <AdminPageHeader
          title="Beállítások"
          description="A rendszer működésének konfigurálása."
        />

        <p className="mt-8 text-gray-500">
          Nem sikerült betölteni a beállításokat.
        </p>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Beállítások"
        description="A rendszer működésének konfigurálása."
      />

      <div className="mt-8 space-y-8">
        <BookingSettings
          settings={{
            autoConfirmBookings:
              settings.autoConfirmBookings,
            cancellationHours:
              settings.cancellationHours,
          }}
        />

        <EmailSettings
          settings={{
            emailNotifications:
              settings.emailNotifications,
          }}
        />

        <ReminderSettings
          settings={{
            reminderEnabled:
              settings.reminderEnabled,
            reminderDaysBefore:
              settings.reminderDaysBefore,
          }}
        />
      </div>
    </>
  );
}