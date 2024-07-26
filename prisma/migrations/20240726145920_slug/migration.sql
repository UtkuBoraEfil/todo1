/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Day_slug_key" ON "Day"("slug");
