import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
const prisma = new PrismaClient();

// type for raw CSV data row in Education.csv
type EducationData = {
	id: string;
	state_abbreviation: string;
	name: string;
	col: string;
	value: string;
};

// type for raw CSV data row in Unemployment.csv
type IncomeData = {
	id: string;
	state_abbreviation: string;
	name: string;
	col: string;
	value: string;
}

// string match function for median household income
function isMedianHouseholdIncome(str: string): boolean {
  const regexPattern = /^Median_Household_Income_.*/;

  return regexPattern.test(str);
}

// string match function for median household income percent
// (when compared to the median household income of the state)
function isMedianHouseholdIncomePercent(str: string): boolean {
  const regexPattern = /^Med_HH_Income_Percent_.*/;

  return regexPattern.test(str);
}

// main ETL function
async function loadIncome() {
	console.log("Loading income data into database")

	const csvData = readFileSync('Unemployment.csv', 'utf-8');
	const lines = csvData.split('\r\n');

	var currId = "-1";

	// process row by row
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

			// data is cleaned here
			if (incomeData.id == "") {
				// If incomeData.id == "", data is unreadable

				// Check if data is salvagable
				if (incomeData.value != "") {
					console.log("Some data is unreadable")
					console.log("Data is: ", incomeData)
				}
				continue; // skip this entry!
			}

			if (incomeData.id == "FIPS_Code") {
				// If incomeData.id == "FIPS_Code", we are in the first row, which are the titles
				if (incomeData.value != "Value" && incomeData.value != undefined) {
					// we are reading the title row when not in the title row??
					// raw data is offset or something more sinister
					console.log("Data may be corrupt: ", incomeData)
					console.log("Please try reloading data from the online sources. Exiting...")
					return;
				}
				continue;
			}
			// end data cleaning segment

			if (currId == incomeData.id) {
				// have already seen this state before... update entry
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
			} else { // have not seen this state before... create new entry 
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

			// data is cleaned here
			if (incomeData.id == "") {
				// If incomeData.id == "", data is unreadable

				// Check if data is salvagable
				if (incomeData.value != "") {
					console.log("Some data is unreadable")
					console.log("Data is: ", incomeData)
				}
				continue; // skip this row!
			}

			if (incomeData.id == "FIPS_Code") {
				// If incomeData.id == "FIPS_Code", we are in the first row, which are the titles
				if (incomeData.value != "Value" && incomeData.value != undefined) {
					// we are reading the title row when not in the title row??
					// raw data is offset or something more sinister
					console.log("Data may be corrupt: ", incomeData)
					console.log("Please try reloading data from the online sources. Exiting...")
					return;
				}
				continue;
			}
			// end data cleaning segment

			if (currId == incomeData.id) {
				// have already seen this county before... update entry
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

				// have not seen this county before... create new entry
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
	console.log("All income data loaded into database")
}

async function loadEducation() {
	console.log("Loading education data into database")

	const csvData = readFileSync('Education.csv', 'utf-8');
	const lines = csvData.split('\r\n');

	var currId = "-1";

	// process row by row
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

			// data is cleaned here
			if (educationData.id == "") {
				// If educationData.id == "", data is unreadable

				// Check if data is salvagable
				if (educationData.value != "") {
					console.log("Some data is unreadable")
					console.log("Data is: ", educationData)
				}
				continue; // skip this entry!
			}

			if (educationData.id == "Federal Information Processing Standard (FIPS) Code") {
				// If educationData.id == "Federal Information Processing Standard (FIPS)", we are in the first row, which are the titles
				if (educationData.value != "Value") {
					// we are reading the title row when not in the title row??
					// raw data is offset or something more sinister
					console.log("Data may be corrupt: ", educationData)
					console.log("Please try reloading data from the online sources. Exiting...")
					return;
				}
				continue;
			}
			// end data cleaning segment

			if (educationData.id == "") {
				continue;
			}

			if (currId == educationData.id) {
				// have already seen this state before... update entry
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
			} else { // have not seen this state before... create new entry
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

			// data is cleaned here
			if (educationData.id == "") {
				// If educationData.id == "", data is unreadable

				// Check if data is salvagable
				if (educationData.value != "") {
					console.log("Some data is unreadable")
					console.log("Data is: ", educationData)
				}
				continue; // skip this row!
			}

			if (educationData.id == "Federal Information Processing Standard (FIPS) Code") {
				// If educationData.id == "Federal Information Processing Standard (FIPS)", we are in the first row, which are the titles
				if (educationData.value != "Value") {
					// we are reading the title row when not in the title row??
					// raw data is offset or something more sinister
					console.log("Data may be corrupt: ", educationData)
					console.log("Please try reloading data from the online sources. Exiting...")
					return;
				}
				continue;
			}
			// end data cleaning segment

			if (currId == educationData.id) {
				// have already seen this county before, update entry
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

			} else { // have not seen this county before, create new entry
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
	console.log("All education data loaded into database")
}

loadIncome();
loadEducation();
