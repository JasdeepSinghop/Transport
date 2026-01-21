/*
  Warnings:

  - You are about to drop the column `kilometers` on the `DailyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `maintenance` on the `DailyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `otherCost` on the `DailyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `repair` on the `DailyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Truck` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Truck` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Truck` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Truck` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Truck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyRecord" DROP COLUMN "kilometers",
DROP COLUMN "maintenance",
DROP COLUMN "otherCost",
DROP COLUMN "repair",
ADD COLUMN     "fuelPrice" DOUBLE PRECISION,
ADD COLUMN     "invoiceCompanyName" TEXT,
ADD COLUMN     "invoiceDate" TIMESTAMP(3),
ADD COLUMN     "invoiceNumber" TEXT,
ADD COLUMN     "invoicePrice" DOUBLE PRECISION,
ADD COLUMN     "invoiceType" TEXT;

-- AlterTable
ALTER TABLE "Truck" DROP COLUMN "capacity",
DROP COLUMN "isDeleted",
DROP COLUMN "model",
DROP COLUMN "status",
DROP COLUMN "year";

-- DropEnum
DROP TYPE "TruckStatus";
