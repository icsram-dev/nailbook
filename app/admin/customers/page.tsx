import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CustomerTable from "@/components/admin/CustomerTable";
import { getCustomers } from "@/lib/customers";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <>
      <AdminPageHeader title="Vendégek" description="A regisztrált vendégek áttekintése." />

      <CustomerTable customers={customers} />
    </>
  );
}
