import Button from "./Button";

type ServiceCardProps = {
  title: string;
  duration: string;
  price: string;
};

export default function ServiceCard({
  title,
  duration,
  price,
}: ServiceCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 text-4xl">💅</div>

      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {duration}
      </p>

      <p className="mt-4 text-2xl font-bold text-pink-600">
        {price}
      </p>

      <div className="mt-6">
        <Button>
          Időpontot foglalok
        </Button>
      </div>
    </div>
  );
}