/*
  Warnings:

  - You are about to drop the column `date` on the `Day` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[target_date]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `target_date` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Day_date_key";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "date",
ADD COLUMN     "target_date" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Day_target_date_key" ON "Day"("target_date");
