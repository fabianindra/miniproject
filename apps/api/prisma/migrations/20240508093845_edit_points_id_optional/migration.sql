-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_pointsId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `pointsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_pointsId_fkey` FOREIGN KEY (`pointsId`) REFERENCES `Point`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
