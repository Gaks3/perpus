/*
  Warnings:

  - A unique constraint covering the columns `[bookId,userId]` on the table `borrow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Bookmark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `bookId` INTEGER NOT NULL,

    UNIQUE INDEX `Bookmark_bookId_userId_key`(`bookId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `borrow_bookId_userId_key` ON `borrow`(`bookId`, `userId`);

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
