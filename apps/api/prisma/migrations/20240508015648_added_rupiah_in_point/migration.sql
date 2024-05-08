/*
  Warnings:

  - Added the required column `rupiah` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Point` ADD COLUMN `rupiah` INTEGER NOT NULL;
