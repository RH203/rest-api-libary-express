-- AlterTable
ALTER TABLE `peminjaman_buku` MODIFY `borrow_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `return_date` DATETIME(3) NULL;
