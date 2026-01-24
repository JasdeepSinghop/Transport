/*
  Warnings:

  - You are about to drop the `MonthlyRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonthlyRecord" DROP CONSTRAINT "MonthlyRecord_truckId_fkey";

-- DropTable
DROP TABLE "MonthlyRecord";
