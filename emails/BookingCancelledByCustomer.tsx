import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type BookingCancelledByCustomerProps = {
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export default function BookingCancelledByCustomer({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: BookingCancelledByCustomerProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Az időpontodat sikeresen lemondtad
      </Preview>

      <Body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "560px",
            margin: "0 auto",
            padding: "40px",
            borderRadius: "16px",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              color: "#db2777",
              marginBottom: "24px",
            }}
          >
            💅 NailBook
          </Heading>

          <Text>Szia {customerName}! 👋</Text>

          <Text>
            Az alábbi időpontodat sikeresen lemondtad.
          </Text>

          <Section
            style={{
              backgroundColor: "#fdf2f8",
              border: "1px solid #fbcfe8",
              borderRadius: "12px",
              padding: "20px",
              margin: "28px 0",
            }}
          >
            <Text>
              <strong>💅 Szolgáltatás:</strong> {serviceName}
            </Text>

            <Text>
              <strong>📅 Dátum:</strong> {appointmentDate}
            </Text>

            <Text>
              <strong>🕒 Időpont:</strong> {appointmentTime}
            </Text>
          </Section>

          <Text>
            Köszönjük, hogy időben jelezted a lemondást.
            Várunk szeretettel egy következő alkalommal!
          </Text>

          <Hr />

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            NailBook 💗
          </Text>
        </Container>
      </Body>
    </Html>
  );
}