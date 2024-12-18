/*
  Warnings:

  - Made the column `coverPic` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverPic` on table `Series` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "coverPic" SET NOT NULL;

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "coverPic" SET NOT NULL;
