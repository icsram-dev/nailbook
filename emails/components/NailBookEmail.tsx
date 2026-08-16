import type { ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const colors = {
  background: "#f3eee8",
  surface: "#fffdfa",
  ink: "#342c28",
  muted: "#756963",
  accent: "#a97967",
  accentDark: "#8f6252",
  border: "#e3d5cc",
  soft: "#f3e8e1",
};

export const buttonStyle = {
  backgroundColor: colors.accent,
  color: "#ffffff",
  padding: "13px 22px",
  borderRadius: "999px",
  textDecoration: "none",
  display: "inline-block",
  fontWeight: "600",
  fontSize: "14px",
};

export function NailBookEmail({
  preview,
  eyebrow,
  title,
  children,
}: {
  preview: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Html lang="hu">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.background,
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "32px 12px",
          color: colors.ink,
        }}
      >
        <Container
          style={{
            backgroundColor: colors.surface,
            maxWidth: "600px",
            margin: "0 auto",
            borderRadius: "24px",
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
          }}
        >
          <Section
            style={{ padding: "32px 40px 25px", backgroundColor: "#eee4dc", textAlign: "center" }}
          >
            <Text
              style={{
                margin: "0",
                color: colors.accent,
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </Text>
            <Heading
              as="h1"
              style={{
                margin: "12px 0 0",
                color: colors.ink,
                fontFamily: "Georgia, Times New Roman, serif",
                fontSize: "32px",
                fontWeight: "400",
                lineHeight: "1.2",
              }}
            >
              {title}
            </Heading>
          </Section>
          <Section style={{ padding: "30px 40px 24px" }}>{children}</Section>
          <Hr style={{ borderColor: colors.border, margin: "0 40px" }} />
          <Section style={{ padding: "20px 40px 28px" }}>
            <Text
              style={{
                margin: "0",
                color: colors.muted,
                fontSize: "12px",
                lineHeight: "18px",
                textAlign: "center",
              }}
            >
              NailBook · Egy kis énidő, finom részletek és körmök, amelyek igazán téged tükröznek.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function AppointmentDetails({
  serviceName,
  appointmentDate,
  appointmentTime,
}: {
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
}) {
  return (
    <Section
      style={{
        backgroundColor: colors.soft,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "18px 20px",
        margin: "24px 0",
      }}
    >
      <Text
        style={{
          margin: "0 0 12px",
          fontFamily: "Georgia, Times New Roman, serif",
          fontSize: "20px",
          color: colors.ink,
        }}
      >
        {serviceName}
      </Text>
      <Text style={{ margin: "4px 0", fontSize: "14px", color: colors.muted }}>
        <strong style={{ color: colors.accentDark }}>Dátum</strong> · {appointmentDate}
      </Text>
      <Text style={{ margin: "4px 0", fontSize: "14px", color: colors.muted }}>
        <strong style={{ color: colors.accentDark }}>Időpont</strong> · {appointmentTime}
      </Text>
    </Section>
  );
}

export const emailText = {
  margin: "0 0 16px",
  color: colors.muted,
  fontSize: "15px",
  lineHeight: "24px",
};
