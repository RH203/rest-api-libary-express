/*
  Warnings:

  - You are about to drop the column `borrow_date` on the `peminjaman_buku` table. All the data in the column will be lost.
  - You are about to drop the column `return_date` on the `peminjaman_buku` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman_buku` DROP COLUMN `borrow_date`,
    DROP COLUMN `return_date`,
    ADD COLUMN `borrow_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `return_at` DATETIME(3) NULL;
