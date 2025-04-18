/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BankCard" ALTER COLUMN "expiryDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "backgroundImage" DROP NOT NULL,
ALTER COLUMN "backgroundImage" SET DEFAULT '',
ALTER COLUMN "successMessage" DROP NOT NULL,
ALTER COLUMN "successMessage" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Profile_name_key" ON "Profile"("name");
