import StatCard from "@/components/ui/StatCard";

type Props = {
  total: number;
  customerCancelled: number;
  adminCancelled: number;
};

export default function CancelledAppointmentsStats({
  total,
  customerCancelled,
  adminCancelled,
}: Props) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
      <StatCard
        title="Összes lemondás"
        value={total}
        icon="📄"
        color="pink"
      />

      <StatCard
        title="Vendég mondta le"
        value={customerCancelled}
        icon="👤"
        color="red"
      />

      <StatCard
        title="Admin mondta le"
        value={adminCancelled}
        icon="👩‍💼"
        color="blue"
      />
    </div>
  );
}