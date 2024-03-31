-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(500) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `ISBN` INTEGER NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `page` INTEGER NOT NULL,
    `year_published` DATETIME(3) NOT NULL,
    `target_reader` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `status` ENUM('borrowed', 'available') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `borrow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `borrow` ADD CONSTRAINT `borrow_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrow` ADD CONSTRAINT `borrow_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
