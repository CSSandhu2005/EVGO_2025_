-- DropForeignKey
ALTER TABLE "TestDriveBooking" DROP CONSTRAINT "TestDriveBooking_carId_fkey";

-- DropForeignKey
ALTER TABLE "TestDriveBooking" DROP CONSTRAINT "TestDriveBooking_userId_fkey";

-- AlterTable
ALTER TABLE "DealershipInfo" ALTER COLUMN "address" SET DEFAULT 'For DealerShip Info And Address You Will Be Guided From Our Side .';

-- AddForeignKey
ALTER TABLE "TestDriveBooking" ADD CONSTRAINT "TestDriveBooking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestDriveBooking" ADD CONSTRAINT "TestDriveBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
