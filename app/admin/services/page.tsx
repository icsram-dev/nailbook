import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { ServiceManager } from "@/components/admin/ServiceManager";
import { getServices } from "@/lib/services";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <AdminPageHeader
        title="Szolgáltatások"
        description="A szolgáltatások kezelése."
      />

      <ServiceManager services={services} />
    </>
  );
}