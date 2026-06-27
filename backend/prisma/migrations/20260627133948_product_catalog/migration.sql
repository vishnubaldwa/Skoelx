/*
  Warnings:

  - You are about to drop the column `active` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `active`,
    ADD COLUMN `currentVersion` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'DEVELOPMENT', 'RETIRED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `ProductModule` ADD COLUMN `mandatory` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ProductVersion` ADD COLUMN `releaseNotes` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `License` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `License` ADD CONSTRAINT `License_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
