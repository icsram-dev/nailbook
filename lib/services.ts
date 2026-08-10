import { prisma } from "@/lib/prisma";
import type { ServiceData } from "@/lib/validations/service";

export async function getServices() {
  return prisma.service.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: {
      id,
    },
  });
}

export async function createService(data: ServiceData) {
  return prisma.service.create({
    data: {
      name: data.name,
      description: data.description || null,
      duration: data.duration,
      price: data.price,
      active: data.active,
      image: data.image || null,
    },
  });
}

export async function updateService(
  id: string,
  data: ServiceData,
) {
  return prisma.service.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description || null,
      duration: data.duration,
      price: data.price,
      active: data.active,
      image: data.image || null,
    },
  });
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: {
      id,
    },
  });
}