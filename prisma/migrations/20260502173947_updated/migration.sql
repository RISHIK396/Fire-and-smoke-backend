/*
  Warnings:

  - A unique constraint covering the columns `[alertToken]` on the table `Detection` will be added. If there are existing duplicate values, this will fail.
  - The required column `alertToken` was added to the `Detection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detection" ADD COLUMN     "alertToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Detection_alertToken_key" ON "Detection"("alertToken");
