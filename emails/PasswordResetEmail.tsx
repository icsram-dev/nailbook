import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  customerName: string;
  resetUrl: string;
};

export default function PasswordResetEmail({
  customerName,
  resetUrl,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Jelszó-visszaállítás</Preview>

      <Body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "40px auto",
          }}
        >
          <Heading>Jelszó-visszaállítás</Heading>

          <Text>Szia {customerName}!</Text>

          <Text>
            Jelszó-visszaállítási kérelmet kaptunk a fiókodhoz.
          </Text>

          <Text>
            Ha valóban te kérted, kattints az alábbi gombra:
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "32px 0",
            }}
          >
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#ec4899",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Új jelszó beállítása
            </Button>
          </Section>

          <Text>
            A link 1 óráig érvényes.
          </Text>

          <Text>
            Ha nem te kérted a jelszó-visszaállítást,
            nyugodtan figyelmen kívül hagyhatod ezt az
            e-mailt.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}