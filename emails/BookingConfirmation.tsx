import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type BookingConfirmationProps = {
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

export function BookingConfirmation({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: BookingConfirmationProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Sikeres időpontfoglalás – NailBook
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
            Köszönjük, hogy a NailBookot választottad! Az időpontodat
            sikeresen lefoglaltuk.
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
            Kérünk, hogy néhány perccel az időpont előtt érkezz meg.
          </Text>

          <Text>
            Ha mégsem megfelelő az időpont, kérjük, mondd le időben, hogy más
            vendég is foglalhasson.
          </Text>

          <Hr />

          <Text>
            Ha mégsem megfelelő az időpont, az alábbi gombra kattintva
            lemondhatod:
          </Text>

          <Button
            href={cancelUrl}
            style={{
              backgroundColor: "#ec4899",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            Időpont lemondása
          </Button>

          <Hr />

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Várunk szeretettel!
          </Text>

          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            NailBook 💗
          </Text>
        </Container>
      </Body>
    </Html>
  );
}