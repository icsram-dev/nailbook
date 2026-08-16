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
export default function BookingRequest({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  cancelUrl,
}: Props) {
  return (
    <NailBookEmail
      preview="Foglalási kérelmed megérkezett"
      eyebrow="Foglalási kérelem"
      title="Köszönjük a foglalásod."
    >
      <Text style={emailText}>Szia {customerName}!</Text>
      <Text style={emailText}>
        A foglalási kérelmed megérkezett. Az időpont adminisztrátori jóváhagyásra vár, erről
        hamarosan külön e-mailben értesítünk.
      </Text>
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
