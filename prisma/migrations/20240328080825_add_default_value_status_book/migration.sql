-- AlterTable
ALTER TABLE `book` MODIFY `status` ENUM('borrowed', 'available') NOT NULL DEFAULT 'available';
