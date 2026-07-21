import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServiceSchema } from "@/lib/validations/service";

export async function POST(request: Request) {
  const body = await request.json();

  const result = createServiceSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const service = await prisma.service.create({
    data: result.data,
  });

  return NextResponse.json(
    {
      success: true,
      service,
    },
    { status: 201 }
  );
}

export async function GET() {
  const services = await prisma.service.findMany({
    where: {
      active: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json({
    success: true,
    services,
  });
}