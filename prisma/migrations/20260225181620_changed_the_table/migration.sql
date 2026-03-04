/*
  Warnings:

  - Added the required column `deviceId` to the `Detection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Detection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Detection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detection" ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
