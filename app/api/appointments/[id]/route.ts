import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const body = await request.json();

  const appointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json({
    success: true,
    appointment,
  });
}