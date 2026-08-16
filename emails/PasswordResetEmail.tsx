import { Button, Section, Text } from "@react-email/components";
import { buttonStyle, emailText, NailBookEmail } from "./components/NailBookEmail";
type Props = { customerName: string; resetUrl: string };
export default function PasswordResetEmail({ customerName, resetUrl }: Props) {
  return (
    <NailBookEmail
      preview="Jelszó-visszaállítási link"
      eyebrow="Fiókbiztonság"
      title="Állíts be új jelszót."
    >
      <Text style={emailText}>Szia {customerName}!</Text>
      <Text style={emailText}>
        Jelszó-visszaállítási kérelmet kaptunk a fiókodhoz. Ha valóban te kezdeményezted, az alábbi
        gombbal új jelszót állíthatsz be.
      </Text>
      <Section style={{ textAlign: "center", margin: "30px 0" }}>
        <Button href={resetUrl} style={buttonStyle}>
          Új jelszó beállítása
        </Button>
      </Section>
      <Text style={emailText}>
        A link 1 óráig érvényes. Ha nem te kérted a módosítást, ezt az e-mailt figyelmen kívül
        hagyhatod.
      </Text>
    </NailBookEmail>
  );
}
