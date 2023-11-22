import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

// Get income data for all states
app.get("/stateIncome", async (req: Request, res: Response) => {
  const states = await prisma.$queryRaw`SELECT * FROM public."StateIncome";`;

  console.log(states);
  res.send(states);
});

// Get income data for all counties
app.get("/countyIncome", async (req: Request, res: Response) => {
  const counties= await prisma.$queryRaw`SELECT * FROM public."CountyIncome";`;

  console.log(counties);
  res.send(counties);
});

// Get education data for all states
app.get("/stateEducation", async (req: Request, res: Response) => {
  const states = await prisma.$queryRaw`SELECT * FROM public."StateEducation";`;

  console.log(states);
  res.send(states);
});

// Get education data for all counties
app.get("/countyEducation", async (req: Request, res: Response) => {
  const counties =
    await prisma.$queryRaw`SELECT * FROM public."CountyEducation";`;

  console.log(counties);
  res.send(counties);
});

// Get income and education data for all states
app.get("/state", async (req: Request, res: Response) => {
  const states =
    await prisma.$queryRaw`SELECT * FROM public."StateEducation" JOIN public."StateIncome" ON public."StateEducation".id = public."StateIncome".id;`;

  console.log(states);
  res.send(states);
});

// Get income and education data for all counties
app.get("/county", async (req: Request, res: Response) => {
  const counties =
    await prisma.$queryRaw`SELECT * FROM public."CountyEducation" JOIN public."CountyIncome" ON public."CountyEducation".id = public."CountyIncome".id;`;

  console.log(counties);
  res.send(counties);
});

// Get income and education data for a specific state
app.get("/state/:state", async (req: Request, res: Response) => {
  const { state } = req.params;
  const stateData =
    await prisma.$queryRaw`SELECT * FROM public."StateEducation" JOIN public."StateIncome" ON public."StateEducation".id = public."StateIncome".id WHERE public."StateEducation".name = ${state};`;

  console.log(stateData);
  res.send(stateData);
});

type state = {
	id: String,
}

// Get income and education data for all counties within a state
app.get("/county/:whichstate", async (req: Request, res: Response) => {
  const { whichstate } = req.params;
  const state: state[] =
    await prisma.$queryRaw`SELECT id FROM public."StateEducation" WHERE name = ${whichstate};`;
  const stateId = state[0].id;
  console.log("StateId:", stateId)

  const counties = await prisma.$queryRaw`SELECT * FROM public."CountyEducation" JOIN public."CountyIncome" ON public."CountyEducation".id = public."CountyIncome".id WHERE public."CountyEducation"."stateId" = ${stateId};`;

  console.log(counties);
  res.send(counties);
});

// Get income and education data for a specific county (specify state b/c there are several counties in diff states w the same name)
app.get("/county/:whichstate/:county", async (req: Request, res: Response) => {
  const { whichstate, county } = req.params;

  const state: state[] =
    await prisma.$queryRaw`SELECT id FROM public."StateEducation" WHERE name = ${whichstate};`;
  const stateId = state[0].id;
  console.log("StateId:", stateId)

  const countyData =
    await prisma.$queryRaw`SELECT * FROM public."CountyEducation" JOIN public."CountyIncome" ON public."CountyEducation".id = public."CountyIncome".id WHERE public."CountyEducation"."stateId" = ${stateId} AND public."CountyEducation"."name" = ${county};`;

  console.log(countyData);
  res.send(countyData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
