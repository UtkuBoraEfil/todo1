/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Day` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Day_userId_key" ON "Day"("userId");
