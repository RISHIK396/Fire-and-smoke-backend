/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Detection` table. All the data in the column will be lost.
  - You are about to drop the column `reportId` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Detection" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "reportId";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_detectionId_fkey" FOREIGN KEY ("detectionId") REFERENCES "Detection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
