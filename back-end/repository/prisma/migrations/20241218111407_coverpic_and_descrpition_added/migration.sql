/*
  Warnings:

  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "coverPic" TEXT,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "coverPic" TEXT,
ADD COLUMN     "description" TEXT NOT NULL;
