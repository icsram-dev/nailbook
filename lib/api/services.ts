export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  image: string | null;
}

export async function getServices(): Promise<Service[]> {
  const response = await fetch("/api/services");

  if (!response.ok) {
    throw new Error("Nem sikerült lekérni a szolgáltatásokat.");
  }

  const { services } = await response.json();

  return services;
}
