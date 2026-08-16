import { prisma } from "@/lib/prisma";
import { ServiceManager } from "@/components/admin/ServiceManager";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ServiceManager services={services} />;
}
