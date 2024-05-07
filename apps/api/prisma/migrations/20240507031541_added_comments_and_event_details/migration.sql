/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checkOut` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `description` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `location` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `price` INTEGER NULL DEFAULT 0,
    ADD COLUMN `rate` INTEGER NULL DEFAULT 0,
    ADD COLUMN `seats` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `checkOut` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `discount` INTEGER NULL;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
