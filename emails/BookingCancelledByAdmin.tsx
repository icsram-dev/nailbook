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

type BookingCancelledByAdminProps = {
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export default function BookingCancelledByAdmin({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: BookingCancelledByAdminProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Az időpontodat töröltük
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

          <Text>
            Szia {customerName}! 👋
          </Text>

          <Text>
            Sajnáljuk, de az alábbi időpontodat töröltük.
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
            Kérjük, foglalj egy új időpontot a számodra megfelelő időpontra.
          </Text>

          <Text>
            Ha kérdésed van, bátran vedd fel velünk a kapcsolatot.
          </Text>

          <Hr />

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Köszönjük a megértésedet!
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