/*
  Warnings:

  - You are about to drop the column `yeigthies` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `ynineties` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `yseventies` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `ytwentyten` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `ytwentytwenty` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `ytwok` on the `StateEducation` table. All the data in the column will be lost.
  - Added the required column `y1970` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y1980` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y1990` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y2000` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y2010` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y2020` to the `StateEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StateEducation" DROP COLUMN "yeigthies",
DROP COLUMN "ynineties",
DROP COLUMN "yseventies",
DROP COLUMN "ytwentyten",
DROP COLUMN "ytwentytwenty",
DROP COLUMN "ytwok",
ADD COLUMN     "y1970" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y1980" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y1990" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y2000" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y2010" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y2020" DOUBLE PRECISION NOT NULL;
