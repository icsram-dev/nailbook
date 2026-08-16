import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      services,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült lekérni a szolgáltatásokat.",
      },
      {
        status: 500,
      }
    );
  }
}
