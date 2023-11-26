# Final Project for CPSC 437 - Database Systems

by Patrick SebaRaj, Nikhil Ismail, Andy Yang

## Set-up
### Backend
- Clone the repository, which also pulls the raw data as a `.csv`
	- Data from the USDA Economic Research Service, found [here](https://www.ers.usda.gov/data-products/county-level-data-sets/)
- Navigate into the backend folder with `cd backend`
	- Prerequisite: Node / NPM
- Run `npm install`
- Create a `.env` file (in `./backend/`) with the Postgres URL for connection to the database
	- `DATABASE_URL="postgresql://{username}:{password}@localhost:{port}/{database_name}?schema=public"`
	- For example, `DATABASE_URL="postgresql://patrick:veryGoodPassword@localhost:5432/cpsc437_project?schema=public"`
- Create relations in the Postgres DB
	- Run `npx prisma migrate dev --name init`
- Load all of the raw data into the Postgres DB with the load script `./backend/src/load-data.ts`
	- Run `npm run load-data`
- Start the backend server with `npm start`
### Frontend
- Navigate into the frontend folder with `cd frontend`
	- Prerequisite: Node / NPM
- Run `npm install`
- Start the frontend web app with `npm start`
