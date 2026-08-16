import { Button, Section, Text } from "@react-email/components";
import { buttonStyle, emailText, NailBookEmail } from "./components/NailBookEmail";
type Props = { firstName: string; verifyUrl: string };
export default function VerifyEmail({ firstName, verifyUrl }: Props) {
  return (
    <NailBookEmail
      preview="Erősítsd meg a NailBook fiókodat"
      eyebrow="Üdvözlünk a NailBookban"
      title="Már csak egy lépés."
    >
      <Text style={emailText}>Szia {firstName}!</Text>
      <Text style={emailText}>
        Köszönjük a regisztrációdat. A fiókod aktiválásához kérünk, erősítsd meg az e-mail címed.
      </Text>
      <Section style={{ textAlign: "center", margin: "30px 0" }}>
        <Button href={verifyUrl} style={buttonStyle}>
          E-mail cím megerősítése
        </Button>
      </Section>
      <Text style={emailText}>
        Ha nem te regisztráltál, ezt az e-mailt nyugodtan figyelmen kívül hagyhatod.
      </Text>
    </NailBookEmail>
  );
}
