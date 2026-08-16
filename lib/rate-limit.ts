import { createHash } from "crypto";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type RateLimitOptions = {
  request: Request;
  namespace: string;
  limit: number;
  windowMs: number;
};

function getClientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function isRateLimitAllowed({
  request,
  namespace,
  limit,
  windowMs,
}: RateLimitOptions) {
  const key = createHash("sha256")
    .update(`${namespace}:${getClientAddress(request)}`)
    .digest("hex");

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const now = new Date();
          const entry = await tx.rateLimit.findUnique({ where: { key } });

          if (!entry) {
            await tx.rateLimit.create({
              data: { key, count: 1, windowStartedAt: now },
            });
            return true;
          }

          if (now.getTime() - entry.windowStartedAt.getTime() >= windowMs) {
            await tx.rateLimit.update({
              where: { key },
              data: { count: 1, windowStartedAt: now },
            });
            return true;
          }

          if (entry.count >= limit) {
            return false;
          }

          await tx.rateLimit.update({
            where: { key },
            data: { count: { increment: 1 } },
          });

          return true;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034" &&
        attempt < 2
      ) {
        continue;
      }

      throw error;
    }
  }

  return false;
}

export function rateLimitResponse() {
  return new Response(
    JSON.stringify({ message: "Túl sok próbálkozás történt. Kérjük, próbáld meg később." }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": "900",
      },
    }
  );
}
