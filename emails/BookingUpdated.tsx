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
export default function BookingUpdated({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: Props) {
  return (
    <NailBookEmail
      preview="Az időpontodat módosítottuk"
      eyebrow="Foglalás módosítva"
      title="Frissültek az időpontod adatai."
    >
      <Text style={emailText}>Szia {customerName}!</Text>
      <Text style={emailText}>Kérünk, ellenőrizd az alábbi frissített foglalási részleteket.</Text>
      <AppointmentDetails
        serviceName={serviceName}
        appointmentDate={appointmentDate}
        appointmentTime={appointmentTime}
      />
      <Section style={{ textAlign: "center", margin: "26px 0 4px" }}>
        <Button href={cancelUrl} style={buttonStyle}>
          Időpont lemondása
        </Button>
      </Section>
    </NailBookEmail>
  );
}
