import { Button, Section, Text } from "@react-email/components";
import {
  AppointmentDetails,
  buttonStyle,
  emailText,
  NailBookEmail,
} from "./components/NailBookEmail";
type Props = {
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
}: Props) {
  return (
    <NailBookEmail
      preview="Időpontfoglalásod megerősítve"
      eyebrow="Foglalás megerősítve"
      title="Találkozunk hamarosan."
    >
      <Text style={emailText}>Szia {customerName}!</Text>
      <Text style={emailText}>Örömmel értesítünk, hogy a foglalásodat megerősítettük.</Text>
      <AppointmentDetails
        serviceName={serviceName}
        appointmentDate={appointmentDate}
        appointmentTime={appointmentTime}
      />
      <Text style={emailText}>
        Kérünk, érkezz néhány perccel korábban, hogy nyugodtan indulhasson az énidőd.
      </Text>
      <Section
        style={{
          backgroundColor: "#f8f5f1",
          border: "1px solid #e3d5cc",
          borderRadius: "14px",
          padding: "14px 18px",
          margin: "22px 0",
        }}
      >
        <Text style={{ ...emailText, margin: "0", fontSize: "13px" }}>
          <strong style={{ color: "#8f6252" }}>Lemondási feltétel</strong>
          <br />
          Az időpont díjmentesen legkésőbb 24 órával a kezdés előtt mondható le. 24 órán belüli
          lemondás vagy meg nem jelenés esetén a szolgáltatás teljes díja fizetendő.
        </Text>
      </Section>
      <Section style={{ textAlign: "center", margin: "26px 0 4px" }}>
        <Button href={cancelUrl} style={buttonStyle}>
          Időpont lemondása
        </Button>
      </Section>
    </NailBookEmail>
  );
}
