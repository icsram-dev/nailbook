import { render } from "@react-email/render";

import { resend } from "./resend";

import BookingRequest from "@/emails/BookingRequest";
import { BookingConfirmation } from "@/emails/BookingConfirmation";
import Reminder from "@/emails/Reminder";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import BookingCancelledByAdmin from "@/emails/BookingCancelledByAdmin";
import BookingUpdated from "@/emails/BookingUpdated";
import BookingCancelledByCustomer from "@/emails/BookingCancelledByCustomer";

type BookingEmailParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

type SendBookingCancelledByCustomerParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export async function sendBookingCancelledByCustomer({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: SendBookingCancelledByCustomerParams) {
  const html = await render(
    <BookingCancelledByCustomer
      customerName={customerName}
      serviceName={serviceName}
      appointmentDate={appointmentDate}
      appointmentTime={appointmentTime}
    />
  );

  return resend.emails.send({
    from: "NailBook <onboarding@resend.dev>",
    to,
    subject: "Az időpontodat sikeresen lemondtad",
    html,
  });
}

export async function sendBookingRequest({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: BookingEmailParams) {
  const html = await render(
    <BookingRequest
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
    subject: "Foglalási kérelmed megérkezett",
    html,
  });
}

export async function sendBookingConfirmed({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: BookingEmailParams) {
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
    subject: "Időpontfoglalás megerősítve",
    html,
  });
}

export async function sendReminderEmail({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: BookingEmailParams) {
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

type SendBookingCancelledByAdminParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export async function sendBookingCancelledByAdmin({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: SendBookingCancelledByAdminParams) {
  const html = await render(
    <BookingCancelledByAdmin
      customerName={customerName}
      serviceName={serviceName}
      appointmentDate={appointmentDate}
      appointmentTime={appointmentTime}
    />
  );

  return resend.emails.send({
    from: "NailBook <onboarding@resend.dev>",
    to,
    subject: "Az időpontodat töröltük",
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

type SendBookingUpdatedParams = {
  to: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

export async function sendBookingUpdated({
  to,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: SendBookingUpdatedParams) {
  const html = await render(
    <BookingUpdated
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
    subject: "Az időpontodat módosítottuk",
    html,
  });
}