-- AlterTable
ALTER TABLE `License` ADD COLUMN `activatedAt` DATETIME(3) NULL,
    ADD COLUMN `lastValidatedAt` DATETIME(3) NULL,
    ADD COLUMN `remarks` VARCHAR(191) NULL,
    ADD COLUMN `revokedAt` DATETIME(3) NULL;
