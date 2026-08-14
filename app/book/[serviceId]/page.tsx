import { redirect } from "next/navigation";

export default async function LegacyServiceBookingPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  redirect(`/booking?service=${encodeURIComponent(serviceId)}`);
}
