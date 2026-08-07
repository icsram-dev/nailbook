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

type Props = {
  firstName: string;
  verifyUrl: string;
};

export default function VerifyEmail({
  firstName,
  verifyUrl,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Erősítsd meg a NailBook fiókodat
      </Preview>

      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "40px",
          }}
        >
          <Heading
            style={{
              color: "#db2777",
            }}
          >
            Üdvözlünk a NailBookban! 💅
          </Heading>

          <Text>
            Kedves {firstName}!
          </Text>

          <Text>
            Köszönjük, hogy regisztráltál a
            NailBook rendszerébe.
          </Text>

          <Text>
            Mielőtt bejelentkeznél és időpontot
            foglalnál, kérjük erősítsd meg az
            e-mail címed.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "30px 0",
            }}
          >
            <Button
              href={verifyUrl}
              style={{
                backgroundColor: "#db2777",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              E-mail cím megerősítése
            </Button>
          </Section>

          <Text
            style={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            Ha nem te regisztráltál,
            egyszerűen hagyd figyelmen kívül
            ezt az e-mailt.
          </Text>

          <Hr />

          <Text
            style={{
              fontSize: "12px",
              color: "#888",
            }}
          >
            © {new Date().getFullYear()} NailBook
          </Text>
        </Container>
      </Body>
    </Html>
  );
}