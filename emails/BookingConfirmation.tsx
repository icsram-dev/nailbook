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

type BookingConfirmationProps = {
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export function BookingConfirmation({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: BookingConfirmationProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Időpontfoglalás visszaigazolása
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
            Köszönjük a foglalásodat.
          </Text>

          <Hr />

          <Section>
            <Text>
              <strong>Szolgáltatás:</strong>{" "}
              {serviceName}
            </Text>

            <Text>
              <strong>Dátum:</strong>{" "}
              {appointmentDate}
            </Text>

            <Text>
              <strong>Időpont:</strong>{" "}
              {appointmentTime}
            </Text>
          </Section>

          <Hr />

          <Text>
            Várunk szeretettel!
          </Text>

          <Text>
            Üdvözlettel,
            <br />
            NailBook
          </Text>
        </Container>
      </Body>
    </Html>
  );
}