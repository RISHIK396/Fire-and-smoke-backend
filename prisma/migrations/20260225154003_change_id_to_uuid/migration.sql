/*
  Warnings:

  - The primary key for the `Detection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Detection" DROP CONSTRAINT "Detection_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Detection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Detection_id_seq";
