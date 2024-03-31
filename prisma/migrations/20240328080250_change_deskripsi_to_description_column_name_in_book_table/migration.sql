/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `book` table. All the data in the column will be lost.
  - Added the required column `description` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `deskripsi`,
    ADD COLUMN `description` TEXT NOT NULL;
