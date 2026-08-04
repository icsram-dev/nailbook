import { render } from "@react-email/render";

import { resend } from "./resend";

import { BookingConfirmation } from "@/emails/BookingConfirmation";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import Reminder from "@/emails/Reminder";

type SendBookingConfirmationParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

export async function sendBookingConfirmation({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: SendBookingConfirmationParams) {
  const html = await render(
    <BookingConfirmation
  customerName={customerName}
  serviceName={serviceName}
  appointmentDate={appointmentDate}
  appointmentTime={appointmentTime}
  cancelUrl={cancelUrl}
/>
  );

  return resend.emails.send({
    from: "NailBook <onboarding@resend.dev>",
    to,
    subject: "Időpontfoglalás visszaigazolása",
    html,
  });
}

type SendReminderEmailParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

export async function sendReminderEmail({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: SendReminderEmailParams) {
  const html = await render(
   <Reminder
  customerName={customerName}
  serviceName={serviceName}
  appointmentDate={appointmentDate}
  appointmentTime={appointmentTime}
  cancelUrl={cancelUrl}
/>
  );

  return resend.emails.send({
    from: "NailBook <onboarding@resend.dev>",
    to,
    subject: "Emlékeztető a közelgő időpontodra",
    html,
  });
}

type SendPasswordResetEmailParams = {
  to: string;
  customerName: string;
  resetUrl: string;
};

export async function sendPasswordResetEmail({
  to,
  customerName,
  resetUrl,
}: SendPasswordResetEmailParams) {
  const html = await render(
    <PasswordResetEmail
      customerName={customerName}
      resetUrl={resetUrl}
    />
  );

  return resend.emails.send({
    from: "NailBook <onboarding@resend.dev>",
    to,
    subject: "Jelszó-visszaállítás",
    html,
  });
}