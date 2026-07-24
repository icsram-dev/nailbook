/*
  Warnings:

  - You are about to drop the column `note` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'IN_PROGRESS';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "note",
ADD COLUMN     "createdByAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "customerNote" TEXT,
ADD COLUMN     "internalNote" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
