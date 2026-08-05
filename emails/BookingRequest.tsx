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

type BookingRequestProps = {
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

export default function BookingRequest({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: BookingRequestProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Foglalási kérelmed megérkezett
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
            Köszönjük a foglalási kérelmedet.
          </Text>

          <Text>
            <strong>
              A foglalásod még adminisztrátori jóváhagyásra vár.
            </strong>
          </Text>

          <Text>
            Amint jóváhagyjuk, egy újabb e-mailben értesítünk.
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
              <strong>💅 Szolgáltatás:</strong>{" "}
              {serviceName}
            </Text>

            <Text>
              <strong>📅 Dátum:</strong>{" "}
              {appointmentDate}
            </Text>

            <Text>
              <strong>🕒 Időpont:</strong>{" "}
              {appointmentTime}
            </Text>
          </Section>

          <Text>
            Ha mégsem megfelelő az időpont, az alábbi
            gombra kattintva lemondhatod.
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
              fontWeight: "bold",
            }}
          >
            Lemondási feltételek
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            • Az időpont legkésőbb <strong>24 órával korábban</strong>
            mondható le díjmentesen.
            <br />
            • 24 órán belüli lemondás esetén a szolgáltatás
            teljes díja fizetendő.
            <br />
            • Meg nem jelenés esetén a szolgáltatás teljes
            díja fizetendő.
          </Text>

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