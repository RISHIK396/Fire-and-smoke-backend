-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FALSE_ALARM', 'ESCALATED');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
