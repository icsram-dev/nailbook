/*
  Warnings:

  - You are about to drop the column `isClosed` on the `OpeningHour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OpeningHour" DROP COLUMN "isClosed",
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true;
