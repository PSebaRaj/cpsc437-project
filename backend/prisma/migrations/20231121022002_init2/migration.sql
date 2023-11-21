/*
  Warnings:

  - You are about to drop the column `y1970` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `y1980` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `y1990` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `y2000` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `y2010` on the `StateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `y2020` on the `StateEducation` table. All the data in the column will be lost.
  - Added the required column `yeigthies` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ynineties` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yseventies` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ytwentyten` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ytwentytwenty` to the `StateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ytwok` to the `StateEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StateEducation" DROP COLUMN "y1970",
DROP COLUMN "y1980",
DROP COLUMN "y1990",
DROP COLUMN "y2000",
DROP COLUMN "y2010",
DROP COLUMN "y2020",
ADD COLUMN     "yeigthies" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ynineties" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yseventies" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ytwentyten" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ytwentytwenty" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ytwok" DOUBLE PRECISION NOT NULL;
