import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
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

function isMedianHouseholdIncome(str: string): boolean {
  const regexPattern = /^Median_Household_Income_.*/;

  return regexPattern.test(str);
}

function isMedianHouseholdIncomePercent(str: string): boolean {
  const regexPattern = /^Med_HH_Income_Percent_.*/;

  return regexPattern.test(str);
}

async function loadIncome() {
	const csvData = readFileSync('Unemployment.csv', 'utf-8');
	const lines = csvData.split('\r\n');

	var currId = "-1";

	for (let line of lines) {
		const splitLine = line.split(',');

		if (parseInt(splitLine[0]) % 1000 == 0) { // state data
			const incomeData: IncomeData = {
				id: splitLine[0],
				state_abbreviation: splitLine[1],
				name: splitLine[2],
				col: splitLine[3],
				value: splitLine[4]
			}

			if (incomeData.id == "") {
				continue;
			}

			if (currId == incomeData.id) {
				// have already seen this before
				if (incomeData.col == "Unemployment_rate_2020") {
					await prisma.stateIncome.update({
						where: {
							id: incomeData.id,
						},
						data: {
							unemploymentY2020: parseFloat(incomeData.value),
						}
					})
				} else if (isMedianHouseholdIncome(incomeData.col)) {
					await prisma.stateIncome.update({
						where: {
							id: incomeData.id,
						},
						data: {
							medianHHIncome: parseInt(incomeData.value),
						}
					})
				} else if (isMedianHouseholdIncomePercent(incomeData.col)) {
					await prisma.stateIncome.update({
						where: {
							id: incomeData.id,
						},
						data: {
							percentStateMHHIncome: parseFloat(incomeData.value),
						}
					})
				}
			} else {
				currId = incomeData.id;

				await prisma.stateIncome.create({
					data: {
						id: incomeData.id,
						name: incomeData.name,
						unemploymentY2020: 0,
						medianHHIncome: 0,
						percentStateMHHIncome: 0,
					}
				})
			}

		} else { // county data
			const thirdColumn = [splitLine[2], splitLine[3]].join(',');
			const cleanedThirdColumn = thirdColumn.replace(/"/g, '');
			const incomeData: IncomeData = {
				id: splitLine[0],
				state_abbreviation: splitLine[1],
				name: cleanedThirdColumn,
				col: splitLine[4],
				value: splitLine[5]
			}

			if (incomeData.id == "") {
				continue;
			}

			console.log(incomeData)

			if (currId == incomeData.id) {
				// have already seen this before
				if (incomeData.col == "Unemployment_rate_2020") {
					await prisma.countyIncome.update({
						where: {
							id: incomeData.id,
						},
						data: {
							unemploymentY2020: parseFloat(incomeData.value),
						}
					})
				} else if (isMedianHouseholdIncome(incomeData.col)) {
					await prisma.countyIncome.update({
						where: {
							id: incomeData.id,
						},
						data: {
							medianHHIncome: parseInt(incomeData.value),
						}
					})
				} else if (isMedianHouseholdIncomePercent(incomeData.col)) {
					await prisma.countyIncome.update({
						where: {
							id: incomeData.id,
						},
						data: {
							percentStateMHHIncome: parseFloat(incomeData.value),
						}
					})
				}
			} else {
				currId = incomeData.id;

				await prisma.countyIncome.create({
					data: {
						id: incomeData.id,
						stateId: (Math.floor(parseInt(incomeData.id)/1000)*1000).toString(),
						name: incomeData.name,
						unemploymentY2020: 0,
						medianHHIncome: 0,
						percentStateMHHIncome: 0,
					}
				})
			}
		}
	}
}

async function loadEducation() {
	const csvData = readFileSync('Education.csv', 'utf-8');
	const lines = csvData.split('\r\n');

	var currId = "-1";

	for (let line of lines) {
		// const splitLine = line.split(',');
		const splitLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((value) => value.trim());

		if (parseInt(splitLine[0]) % 1000 == 0) { // state data
			const educationData: EducationData = {
				id: splitLine[0],
				state_abbreviation: splitLine[1],
				name: splitLine[2],
				col: splitLine[3],
				value: splitLine[4]
			}

			console.log(educationData)

			if (educationData.id == "") {
				continue;
			}

			if (currId == educationData.id) {
				// have already seen this before
				if (educationData.col == `"Percent of adults completing four years of college or higher, 1970"`) {
					await prisma.stateEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y1970: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults completing four years of college or higher, 1980"`) {
					await prisma.stateEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y1980: parseInt(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 1990"`) {
					await prisma.stateEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y1990: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 2000"`) {
					await prisma.stateEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y2000: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 2008-12"`) {
					await prisma.stateEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y2010: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 2017-21"`) {
					await prisma.stateEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y2020: parseFloat(educationData.value),
						}
					})
				}
			} else {
				currId = educationData.id;

				await prisma.stateEducation.create({
					data: {
						id: educationData.id,
						name: educationData.name,
						y1970: 0,
						y1980: 0,
						y1990: 0,
						y2000: 0,
						y2010: 0,
						y2020: 0,
					}
				})
			}

		} else { // county data
			const educationData: EducationData = {
				id: splitLine[0],
				state_abbreviation: splitLine[1],
				name: splitLine[2],
				col: splitLine[3],
				value: splitLine[4]
			}

			if (educationData.id == "") {
				continue;
			}

			console.log(educationData)

			if (currId == educationData.id) {
				// have already seen this before
				if (educationData.col == `"Percent of adults completing four years of college or higher, 1970"`) {
					await prisma.countyEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y1970: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults completing four years of college or higher, 1980"`) {
					await prisma.countyEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y1980: parseInt(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 1990"`) {
					await prisma.countyEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y1990: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 2000"`) {
					await prisma.countyEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y2000: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 2008-12"`) {
					await prisma.countyEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y2010: parseFloat(educationData.value),
						}
					})
				} else if (educationData.col == `"Percent of adults with a bachelor's degree or higher, 2017-21"`) {
					await prisma.countyEducation.update({
						where: {
							id: educationData.id,
						},
						data: {
							y2020: parseFloat(educationData.value),
						}
					})
				}

			} else {
				currId = educationData.id;

				await prisma.countyEducation.create({
					data: {
						id: educationData.id,
						stateId: (Math.floor(parseInt(educationData.id)/1000)*1000).toString(),
						name: educationData.name,
						y1970: 0,
						y1980: 0,
						y1990: 0,
						y2000: 0,
						y2010: 0,
						y2020: 0,
					}
				})
			}
		}
	}
}


loadIncome();
loadEducation();
