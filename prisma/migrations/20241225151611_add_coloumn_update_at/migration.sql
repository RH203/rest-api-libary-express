/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `peminjaman_buku` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman_buku` DROP COLUMN `deleted_at`,
    ADD COLUMN `update_at` DATETIME(3) NULL;
