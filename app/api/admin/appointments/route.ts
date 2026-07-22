import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { appointmentSchema } from "@/lib/validations/appointment";
import { updateAppointment } from "@/lib/appointment";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Nincs jogosultság." },
        { status: 403 },
      );
    }

    const { id } = await params;

    const body = await request.json();

    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Érvénytelen adatok.",
          issues: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const appointment = await updateAppointment({
      appointmentId: id,
      ...result.data,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Ismeretlen hiba történt.",
      },
      {
        status: 500,
      },
    );
  }
}
