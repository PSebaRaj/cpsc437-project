import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type EducationData = {
	id: string;
	state_abbreviation: string;
	name: string;
	col: string;
	value: string;
};

type IncomeData = {
	id: string;
	state_abbreviation: string;
	name: string;
	col: string;
	value: string;
}

// https://levelup.gitconnected.com/read-csv-file-in-node-js-and-typescript-91cf98e2e64e
async function loadIncome() {

}

async function loadEducation() {

}


loadIncome();
loadEducation();
