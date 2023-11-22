/*
  Warnings:

  - Added the required column `name` to the `CountyIncome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CountyEducation" ALTER COLUMN "y1970" DROP NOT NULL,
ALTER COLUMN "y1980" DROP NOT NULL,
ALTER COLUMN "y1990" DROP NOT NULL,
ALTER COLUMN "y2000" DROP NOT NULL,
ALTER COLUMN "y2010" DROP NOT NULL,
ALTER COLUMN "y2020" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CountyIncome" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "unemploymentY2020" DROP NOT NULL,
ALTER COLUMN "medianHHIncome" DROP NOT NULL,
ALTER COLUMN "percentStateMHHIncome" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StateIncome" ALTER COLUMN "unemploymentY2020" DROP NOT NULL,
ALTER COLUMN "medianHHIncome" DROP NOT NULL,
ALTER COLUMN "percentStateMHHIncome" DROP NOT NULL;
