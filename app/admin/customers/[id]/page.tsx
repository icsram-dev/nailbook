import { notFound } from "next/navigation";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CustomerProfile from "@/components/admin/customers/CustomerProfile";
import { getCustomerById } from "@/lib/customers";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CustomerPage({
  params,
}: Props) {
  const { id } = await params;

  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        title={`${customer.lastName} ${customer.firstName}`}
        description="Vendég profilja és foglalási előzményei."
      />

      <CustomerProfile customer={customer} />
    </>
  );
}