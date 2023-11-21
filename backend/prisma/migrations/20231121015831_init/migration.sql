-- CreateTable
CREATE TABLE "StateEducation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "y1970" DOUBLE PRECISION NOT NULL,
    "y1980" DOUBLE PRECISION NOT NULL,
    "y1990" DOUBLE PRECISION NOT NULL,
    "y2000" DOUBLE PRECISION NOT NULL,
    "y2010" DOUBLE PRECISION NOT NULL,
    "y2020" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StateEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountyEducation" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "y1970" DOUBLE PRECISION NOT NULL,
    "y1980" DOUBLE PRECISION NOT NULL,
    "y1990" DOUBLE PRECISION NOT NULL,
    "y2000" DOUBLE PRECISION NOT NULL,
    "y2010" DOUBLE PRECISION NOT NULL,
    "y2020" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CountyEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateIncome" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unemploymentY2020" DOUBLE PRECISION NOT NULL,
    "medianHHIncome" INTEGER NOT NULL,
    "percentStateMHHIncome" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StateIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountyIncome" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "unemploymentY2020" DOUBLE PRECISION NOT NULL,
    "medianHHIncome" INTEGER NOT NULL,
    "percentStateMHHIncome" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CountyIncome_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CountyEducation" ADD CONSTRAINT "CountyEducation_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateEducation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountyIncome" ADD CONSTRAINT "CountyIncome_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "StateIncome"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
