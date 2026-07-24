import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const RESET_TOKEN_EXPIRATION_HOURS = 1;

export async function createPasswordResetToken(userId: string) {
  // Régi tokenek törlése
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });

  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + RESET_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000
  );

  return prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
}

export async function validatePasswordResetToken(token: string) {
  return prisma.passwordResetToken.findFirst({
    where: {
      token,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  });
}

export async function deletePasswordResetToken(token: string) {
  await prisma.passwordResetToken.delete({
    where: {
      token,
    },
  });
}