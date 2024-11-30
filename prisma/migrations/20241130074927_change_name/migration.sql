/*
  Warnings:

  - You are about to drop the column `bookId` on the `peminjaman_buku` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `peminjaman_buku` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id,book_id]` on the table `peminjaman_buku` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_id` to the `peminjaman_buku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `peminjaman_buku` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `peminjaman_buku` DROP FOREIGN KEY `peminjaman_buku_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `peminjaman_buku` DROP FOREIGN KEY `peminjaman_buku_studentId_fkey`;

-- DropIndex
DROP INDEX `peminjaman_buku_studentId_bookId_key` ON `peminjaman_buku`;

-- AlterTable
ALTER TABLE `peminjaman_buku` DROP COLUMN `bookId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `book_id` INTEGER NOT NULL,
    ADD COLUMN `student_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `peminjaman_buku_student_id_book_id_key` ON `peminjaman_buku`(`student_id`, `book_id`);

-- AddForeignKey
ALTER TABLE `peminjaman_buku` ADD CONSTRAINT `peminjaman_buku_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman_buku` ADD CONSTRAINT `peminjaman_buku_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
