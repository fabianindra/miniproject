/*
  Warnings:

  - You are about to drop the column `type` on the `Points` table. All the data in the column will be lost.
  - Added the required column `changeType` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Points` DROP COLUMN `type`,
    ADD COLUMN `changeType` VARCHAR(191) NOT NULL;
