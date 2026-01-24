-- CreateTable
CREATE TABLE "MonthlyRecord" (
    "id" SERIAL NOT NULL,
    "truckId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "totalKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalFuelLiters" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalFuelPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalInvoicePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyRecord_truckId_year_month_key" ON "MonthlyRecord"("truckId", "year", "month");

-- AddForeignKey
ALTER TABLE "MonthlyRecord" ADD CONSTRAINT "MonthlyRecord_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
