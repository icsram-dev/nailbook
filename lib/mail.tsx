import { render } from "@react-email/render";
import { resend } from "./resend";

import { BookingConfirmation } from "@/emails/BookingConfirmation";
import PasswordResetEmail from "@/emails/PasswordResetEmail";

type SendBookingConfirmationParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export async function sendBookingConfirmation({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: SendBookingConfirmationParams) {
  const html = await render(
    <BookingConfirmation
      customerName={customerName}
      serviceName={serviceName}
      appointmentDate={appointmentDate}
      appointmentTime={appointmentTime}
    />
  );

  return resend.emails.send({
    from: "NailBook <onboarding@resend.dev>",
    to,
    subject: "Időpontfoglalás visszaigazolása",
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