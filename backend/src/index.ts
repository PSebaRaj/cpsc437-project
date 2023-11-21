import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.get('/create', async (req: Request, res: Response) => {
	await prisma.stateEducation.create({
		data: {
			id: "90003",
			name: "California",
			y1970: 1230.1,
			y1980:  1230.1,
			y1990: 1230.1,
			y2000: 1230.1,
			y2010: 1230.1,
			y2020: 1230.1,
		}
	})

	const states = await prisma.stateEducation.findMany();

	console.log(states);
  res.send(states);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
