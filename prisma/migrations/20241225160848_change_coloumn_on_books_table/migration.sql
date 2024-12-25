/*
  Warnings:

  - You are about to drop the column `deteled_at` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `deteled_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;
