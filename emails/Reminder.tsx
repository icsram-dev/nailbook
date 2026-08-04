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

type ReminderProps = {
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelUrl: string;
};

export default function Reminder({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: ReminderProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Emlékeztető a közelgő időpontodra
      </Preview>

      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "32px",
            borderRadius: "12px",
          }}
        >
          <Heading>NailBook</Heading>

          <Text>Szia {customerName}! 👋</Text>

          <Text>
            Ez egy emlékeztető, hogy <strong>2 nap múlva</strong> időpontod
            van.
          </Text>

          <Hr />

          <Section>
            <Text>
              <strong>Szolgáltatás:</strong> {serviceName}
            </Text>

            <Text>
              <strong>Dátum:</strong> {appointmentDate}
            </Text>

            <Text>
              <strong>Időpont:</strong> {appointmentTime}
            </Text>
          </Section>

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

          <Text>Szeretettel várunk!</Text>

          <Text>
            Üdvözlettel,
            <br />
            NailBook 💗
          </Text>
        </Container>
      </Body>
    </Html>
  );
}