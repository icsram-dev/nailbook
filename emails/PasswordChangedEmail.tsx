import { Text } from "@react-email/components";

import { emailText, NailBookEmail } from "./components/NailBookEmail";

type Props = {
  customerName: string;
};

export default function PasswordChangedEmail({ customerName }: Props) {
  return (
    <NailBookEmail
      preview="A jelszavad sikeresen megváltozott"
      eyebrow="Fiókbiztonság"
      title="A jelszavad megváltozott."
    >
      <Text style={emailText}>Szia {customerName}!</Text>
      <Text style={emailText}>
        Sikeresen beállítottál egy új jelszót a NailBook-fiókodhoz.
      </Text>
      <Text style={emailText}>
        Ha nem te végezted ezt a módosítást, kérjük, azonnal vedd fel velünk a kapcsolatot.
      </Text>
    </NailBookEmail>
  );
}
