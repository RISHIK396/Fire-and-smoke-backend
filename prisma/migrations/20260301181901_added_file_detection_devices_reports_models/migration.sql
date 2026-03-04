/*
  Warnings:

  - You are about to drop the column `confidence` on the `Detection` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Detection` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Detection` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Detection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `confidence` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Report` table. All the data in the column will be lost.
  - Added the required column `sensorTriggered` to the `Detection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Detection" DROP COLUMN "confidence",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "status",
ADD COLUMN     "mlConfidence" DOUBLE PRECISION,
ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reportId" TEXT,
ADD COLUMN     "sensorTriggered" BOOLEAN NOT NULL,
ADD COLUMN     "smokeLevel" DOUBLE PRECISION,
ADD COLUMN     "temperature" DOUBLE PRECISION,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "updatedAt",
ADD COLUMN     "detectionId" TEXT,
ADD COLUMN     "reportId" TEXT;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "confidence",
DROP COLUMN "imageUrl",
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "escalatedAt" TIMESTAMP(3),
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "severity" "SeverityLevel" NOT NULL;

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detection" ADD CONSTRAINT "Detection_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detection" ADD CONSTRAINT "Detection_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
