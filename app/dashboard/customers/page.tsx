import { prisma } from "@/lib/prisma";

import { CustomerManager } from "@/components/customers/CustomerManager";

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <CustomerManager customers={customers} />
  );
}