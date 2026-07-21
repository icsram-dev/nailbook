import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";

export default function Services() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Szolgáltatások
          </h2>

          <p className="mt-4 text-gray-600">
            Válaszd ki a számodra megfelelő szolgáltatást.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            title="Gél lakk"
            duration="60 perc"
            price="6 500 Ft"
          />

          <ServiceCard
            title="Erősített gél lakk"
            duration="90 perc"
            price="8 500 Ft"
          />

          <ServiceCard
            title="Műköröm építés"
            duration="150 perc"
            price="12 000 Ft"
          />

          <ServiceCard
            title="Töltés"
            duration="120 perc"
            price="9 000 Ft"
          />
        </div>
      </Container>
    </section>
  );
}