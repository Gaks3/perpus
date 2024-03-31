/*
  Warnings:

  - Added the required column `returnDate` to the `borrow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrow` ADD COLUMN `returnDate` DATETIME(3) NOT NULL;
