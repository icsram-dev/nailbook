import { NextResponse } from "next/server";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Nincs jogosultság.",
        },
        {
          status: 401,
        }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          message: "Nem választottál képet.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "nailbook/services",
          },
          (error, result) => {
            if (error || !result) {
              reject(error);
              return;
            }

            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Nem sikerült feltölteni a képet.",
      },
      {
        status: 500,
      }
    );
  }
}