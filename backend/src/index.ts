import express, { Request, Response } from "express";
import { PrismaClient, StateEducation } from "@prisma/client";
const cors = require("cors"); // Import the 'cors' package

const app = express();

// Use CORS middleware
app.use(cors());

const port = process.env.PORT || 3030;

const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

// Get income data for all states
app.get("/stateIncome", async (req: Request, res: Response) => {
  const states = await prisma.$queryRaw`
	SELECT
		*
	FROM
		public."StateIncome"
	;`;

  console.log(states);
  res.send(states);
});

// Get income data for all counties
app.get("/countyIncome", async (req: Request, res: Response) => {
  const counties = await prisma.$queryRaw`
	SELECT
		*
	FROM
		public."CountyIncome"
	;`;

  console.log(counties);
  res.send(counties);
});

// Get education data for all states
app.get("/stateEducation", async (req: Request, res: Response) => {
  const states = await prisma.$queryRaw`
	SELECT
		*
	FROM
		public."StateEducation"
	;`;

  console.log(states);
  res.send(states);
});

// Get education data for all counties
app.get("/countyEducation", async (req: Request, res: Response) => {
  const counties = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyEducation"
	;`;

  console.log(counties);
  res.send(counties);
});

// Get income and education data for all states
app.get("/state", async (req: Request, res: Response) => {
  const states = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateEducation"
		JOIN
			public."StateIncome"
		ON
			public."StateEducation".id = public."StateIncome".id
	;`;

  console.log(states);
  res.send(states);
});

// Get income and education data for all counties
app.get("/county", async (req: Request, res: Response) => {
  const counties = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
	;`;

  console.log(counties);
  res.send(counties);
});

// Get income data for a specific state
app.get("/state-income/:state", async (req: Request, res: Response) => {
  const { state } = req.params;
  const stateData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateIncome"
		WHERE
			public."StateIncome".name = ${state}
	;`;

  console.log(stateData);
  res.send(stateData);
});

// Get education data for a specific state
app.get("/state-education/:state", async (req: Request, res: Response) => {
  const { state } = req.params;
  const stateData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateEducation"
		WHERE
			public."StateEducation".name = ${state}
	;`;

  console.log(stateData);
  res.send(stateData);
});

// Get income and education data for a specific state
app.get("/state/:state", async (req: Request, res: Response) => {
  const { state } = req.params;
  const stateData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateEducation"
		JOIN
			public."StateIncome"
		ON
			public."StateEducation".id = public."StateIncome".id
		WHERE
			public."StateEducation".name = ${state}
	;`;

  console.log(typeof stateData);

  console.log(stateData);
  res.send(stateData);
});

// Get income data when comparing two diff states
app.get("/state-income/compare/:state1/:state2", async (req: Request, res: Response) => {
  const { state1, state2 } = req.params;
  const stateData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateIncome"
		WHERE
			public."StateIncome".name = ${state1}
			OR
			public."StateIncome".name = ${state2}
	;`;

  console.log(stateData);
  res.send(stateData);
});

// Get education data when comparing two diff states
app.get("/state-education/compare/:state1/:state2", async (req: Request, res: Response) => {
  const { state1, state2 } = req.params;
  const stateData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateEducation"
		WHERE
			public."StateEducation".name = ${state1}
			OR
			public."StateEducation".name = ${state2}
	;`;

  console.log(stateData);
  res.send(stateData);
});

// Get income and education data when comparing two diff states
app.get("/state/compare/:state1/:state2", async (req: Request, res: Response) => {
  const { state1, state2 } = req.params;

  const states = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."StateEducation"
		JOIN
			public."StateIncome"
		ON
			public."StateEducation".id = public."StateIncome".id
		WHERE
			public."StateEducation".name = ${state1}
			OR
			public."StateEducation".name = ${state2}
	;`;

  res.send(states);
});

type state = {
  id: String;
};

// Get income and education data for all counties within a state
app.get("/county/:whichstate", async (req: Request, res: Response) => {
  const { whichstate } = req.params;
  const state: state[] = await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate}
	;`;

  const stateId = state[0].id;
  console.log("StateId:", stateId);

  const counties = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
		WHERE
			public."CountyEducation"."stateId" = ${stateId}
	;`;

  console.log(counties);
  res.send(counties);
});

// Get income data for a specific county (specify state b/c there are several counties in diff states w the same name)
app.get(
  "/county-income/:whichstate/:county",
  async (req: Request, res: Response) => {
    const { whichstate, county } = req.params;

    const state: state[] = await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate}
	;`;

    const stateId = state[0].id;
    console.log("StateId:", stateId);

    const countyData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyIncome"
		WHERE
			public."CountyIncome"."stateId" = ${stateId}
		AND
			public."CountyIncome"."name" = ${county}
	;`;

    console.log(countyData);
    res.send(countyData);
  }
);

// Get education data for a specific county (specify state b/c there are several counties in diff states w the same name)
app.get(
  "/county-education/:whichstate/:county",
  async (req: Request, res: Response) => {
    const { whichstate, county } = req.params;

    const state: state[] =
      await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate}
	;`;

    const stateId = state[0].id;
    console.log("StateId:", stateId);
    const countyName = county.slice(4);
    console.log(countyName);

    const countyData = await prisma.$queryRaw`
		SELECT
			public."CountyEducation".id,
			public."CountyEducation"."stateId",
			public."CountyEducation"."name",
			public."CountyEducation".y1970,
			public."CountyEducation".y1980,
			public."CountyEducation".y1990,
			public."CountyEducation".y2000,
			public."CountyEducation".y2010,
			public."CountyEducation".y2020
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
		WHERE
			public."CountyEducation"."stateId" = ${stateId}
			AND
			public."CountyIncome"."name" = ${county}
	;`;

    console.log(countyData);
    res.send(countyData);
  }
);

// Get income and education data for a specific county (specify state b/c there are several counties in diff states w the same name)
app.get("/county/:whichstate/:county", async (req: Request, res: Response) => {
  const { whichstate, county } = req.params;

  const state: state[] = await prisma.$queryRaw`
	SELECT
		id
	FROM
		public."StateEducation"
	WHERE
		name = ${whichstate}
	;`;
  const stateId = state[0].id;
  console.log("StateId:", stateId);

  const countyData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
		WHERE
			public."CountyEducation"."stateId" = ${stateId}
			AND
			public."CountyIncome"."name" = ${county}
	;`;

  console.log(countyData);
  res.send(countyData);
});

// START COMPARISON COUNTY SECTION
//

// Compare income data for two counties (specify state b/c there are several counties in diff states w the same name)
app.get(
  "/county-income/compare/:whichstate/:county/:otherstate/:othercounty",
  async (req: Request, res: Response) => {
    const { whichstate, county, otherstate, othercounty } = req.params;

    const state1: state[] = await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate}
	;`;

    const state2: state[] = await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${otherstate}
	;`;

    const stateId1 = state1[0].id;
    const stateId2 = state2[0].id;
    console.log("StateId1:", stateId1);
    console.log("StateId2:", stateId2);

    const countyData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyIncome"
		WHERE
			(public."CountyIncome"."stateId" = ${stateId1}
		AND
			public."CountyIncome"."name" = ${county})
		OR
			(public."CountyIncome"."stateId" = ${stateId2}
		AND
			public."CountyIncome"."name" = ${othercounty})
	;`;

    console.log(countyData);
    res.send(countyData);
  }
);

// Compare education data for two counties (specify state b/c there are several counties in diff states w the same name)
app.get(
  "/county-education/compare/:whichstate1/:county1/:whichstate2/:county2",
  async (req: Request, res: Response) => {
    const { whichstate1, county1, whichstate2, county2 } = req.params;

    const state1: state[] =
      await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate1}
	;`;
    const state2: state[] =
      await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate2}
	;`;

    const stateId1 = state1[0].id;
    console.log("StateId1:", stateId1);
    const countyName1 = county1.slice(4);
    console.log(countyName1);

    const stateId2 = state2[0].id;
    console.log("StateId2:", stateId2);
    const countyName2 = county2.slice(4);
    console.log(countyName2);

    const countyData = await prisma.$queryRaw`
		SELECT
			public."CountyEducation".id,
			public."CountyEducation"."stateId",
			public."CountyEducation"."name",
			public."CountyEducation".y1970,
			public."CountyEducation".y1980,
			public."CountyEducation".y1990,
			public."CountyEducation".y2000,
			public."CountyEducation".y2010,
			public."CountyEducation".y2020
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
		WHERE
			(public."CountyEducation"."stateId" = ${stateId1}
			AND
			public."CountyIncome"."name" = ${county1})
			OR
			(public."CountyEducation"."stateId" = ${stateId2}
			AND
			public."CountyIncome"."name" = ${county2})
	;`;

    console.log(countyData);
    res.send(countyData);
  }
);

// Compare income and education data for two counties (specify state b/c there are several counties in diff states w the same name)
app.get("/county/compare/:whichstate/:county/:otherstate/:othercounty", async (req: Request, res: Response) => {
  const { whichstate, county, otherstate, othercounty } = req.params;

  const state: state[] = await prisma.$queryRaw`
	SELECT
		id
	FROM
		public."StateEducation"
	WHERE
		name = ${whichstate}
	;`;
  const stateId = state[0].id;
  const newState: state[] = await prisma.$queryRaw`
	SELECT
		id
	FROM
		public."StateEducation"
	WHERE
		name = ${otherstate}
	;`;
  const newStateId = newState[0].id;


  const countyData = await prisma.$queryRaw`
		SELECT
			*
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
		WHERE
			(public."CountyEducation"."stateId" = ${stateId}
			AND
			public."CountyIncome"."name" = ${county})
			OR
			(public."CountyEducation"."stateId" = ${newStateId}
			AND
			public."CountyIncome"."name" = ${othercounty})
	;`;

  console.log(countyData);
  res.send(countyData);
});

//
// END COMPARISON COUNTY SECTION

interface IName {
  name: string;
}
// Get names of all states
app.get("/state-names", async (req: Request, res: Response) => {
  const states: IName[] = await prisma.$queryRaw`
		SELECT
			public."StateEducation".name
		FROM
			public."StateEducation"
		JOIN
			public."StateIncome"
		ON
			public."StateEducation".id = public."StateIncome".id;
	`;

  const stateNames: string[] = states.map((state: IName) => state.name);

  console.log(stateNames);
  res.send(stateNames);
});

// Get names of all counties
app.get("/county-names", async (req: Request, res: Response) => {
  const counties: IName[] = await prisma.$queryRaw`
		SELECT
			public."CountyIncome".name
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
	;`;

  const countyNames: string[] = counties.map((county: IName) => county.name);

  console.log(countyNames);
  res.send(countyNames);
});

// Get names of all counties within a state
app.get("/county-names/:whichstate", async (req: Request, res: Response) => {
  const { whichstate } = req.params;
  const state: state[] = await prisma.$queryRaw`
		SELECT
			id
		FROM
			public."StateEducation"
		WHERE
			name = ${whichstate}
	;`;

  const stateId = state[0].id;
  console.log("StateId:", stateId);

  const counties: IName[] = await prisma.$queryRaw`
		SELECT
			public."CountyIncome".name
		FROM
			public."CountyEducation"
		JOIN
			public."CountyIncome"
		ON
			public."CountyEducation".id = public."CountyIncome".id
		WHERE
			public."CountyEducation"."stateId" = ${stateId}
	;`;

  const countyNames: string[] = counties.map((county: IName) => county.name);

  console.log(countyNames);
  res.send(countyNames);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
