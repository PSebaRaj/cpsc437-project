import React, { useState } from 'react';
import './App.css';
import Dropdown from './Components/Dropdown/Dropdown';
import RadioButton from './Components/RadioButton/RadioButton';
import axios from 'axios';
import Checkbox from './Components/Checkbox/Checkbox';
import { states } from "./constants";
import IncomeTable from './Components/Tables/IncomeTable';
import EducationTable from './Components/Tables/EducationTable';
import IncomeEducationTable from './Components/Tables/IncomeEducationTable';

function App() {
  const [region, setRegion] = useState('');
  const [income, setIncome] = useState(false);
  const [education, setEducation] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [incomeEducationData, setIncomeEducationData] = useState([]);
  const [dropdown1, setDropDown1] = useState("N/A");
  const [dropdown2, setDropDown2] = useState("N/A");
  const [dropdown3, setDropDown3] = useState("N/A");
  const [dropdown4, setDropDown4] = useState("N/A");

  const nationalOptions = [
    { value: "N/A", label: "----Select an option----" },
    { value: 'USA', label: 'United States of America' },
    { value: "All States", label: "All States" },
    { value: "All Counties", label: "All Counties" },
  ];

  const stateOptions = states;

  const resetValues = () => {
    // setRegion('');
    setIncome(false);
    setEducation(false);
    setDropDown1("N/A");
    setDropDown2("N/A");
    setDropDown3("N/A");
    setDropDown4("N/A");
  }

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleIncomeChange = () => {
    setIncome(!income)
  };

  const handleEducationChange = () => {
    setEducation(!education)
  };

  const handleDropdown1Change = (value) => {
    setDropDown1(value);
  };

  const handleDropdown2Change = (value) => {
    setDropDown2(value);
  };

  const handleDropdown3Change = (value) => {
    setDropDown3(value);
  };

  const handleDropdown4Change = (value) => {
    setDropDown4(value);
  };

  const handleSubmit = () => {
    const baseUrl = "http://localhost:3030/";
    if (region) {
      if (income || education) {
        let url = "";
        if (region === "national" && dropdown1 !== "N/A") {
          if (dropdown1 === "USA") {
            if (income && !education) url = "nationIncome"
            if (education && !income) url = "nationEducation"
            if (education && income) url = "nation"
          } else if (dropdown1 === "All States") {
            if (income && !education) url = "stateIncome"
            if (!income && education) url = "stateEducation"
            if (income && education) url = "state"
          } else {
            if (income && !education) url = "countyIncome"
            if (!income && education) url = "countyEducation"
            if (income && education) url = "county"
          }
        }
        if (region === "state" && dropdown1 !== "N/A") {
          if (dropdown2 === "N/A") {
            if (income && !education) url = "state-income/" + dropdown1
            if (!income && education) url = "state-education/" + dropdown1
            if (income && education) url = "state/" + dropdown1
          } else {
            if (income && !education) url = "state-income/compare/" + dropdown1 + "/" + dropdown2
            if (!income && education) url = "state-education/compare/" + dropdown1 + "/" + dropdown2
            if (income && education) url = "state/compare/" + dropdown1 + "/" + dropdown2
          }
        }
        if (region === "county" && dropdown1 !== "N/A" && dropdown2 !== "N/A") {
          if (dropdown3 === "N/A" || dropdown4 === "N/A") {
            if (income && !education) url = "county-income/" + dropdown1 + "/" + dropdown2
            if (!income && education) url = "county-education/" + dropdown1 + "/" + dropdown2
            if (income && education) url = "county/" + dropdown1 + "/" + dropdown2
          } else {
            if (income && !education) url = "county-income/compare/" + dropdown1 + "/" + dropdown2 + "/" + dropdown3 + "/" + dropdown4
            if (!income && education) url = "county-education/compare/" + dropdown1 + "/" + dropdown2 + "/" + dropdown3 + "/" + dropdown4
            if (income && education) url = "county/compare/" + dropdown1 + "/" + dropdown2 + "/" + dropdown3 + "/" + dropdown4
          }
        }
        axios.get(baseUrl + url)
          .then(response => {
            console.log('Response:', response.data);
            if (income && !education) {
              setIncomeData(response.data);
              setEducationData([]);
              setIncomeEducationData([]);
            } else if (!income && education) {
              setEducationData(response.data);
              setIncomeData([]);
              setIncomeEducationData([]);
            } else if (income && education) {
              setIncomeEducationData(response.data);
              setIncomeData([]);
              setEducationData([]);;
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {
        console.log("Please select a metric to analyze");
      }
    } else {
      console.log('Please select a region to analyze');
    }
    resetValues();
  }

  return (
    <div className="website">
      <div className="header">
        <h1>Welcome to Bang For Your Buck!</h1>
        <p>This is an interactive website that allows you to see how county-level income data correlates to state-wide school rankings</p>
      </div>
      <div className="radioButtons">
        <RadioButton handleRegionChange={handleRegionChange} region={region} />
      </div>
      {region.length > 0 &&
      <div className='dropdown'>
        <Dropdown 
          region={region} 
          options={region === "national" ? nationalOptions : stateOptions}
          handleDropdown1Change={handleDropdown1Change}
          handleDropdown2Change={handleDropdown2Change}
          handleDropdown3Change={handleDropdown3Change}
          handleDropdown4Change={handleDropdown4Change}
        />
      </div>
      }
      <div className="checkbox">
        <Checkbox education={education} income={income} handleEducationChange={handleEducationChange} handleIncomeChange={handleIncomeChange} />
      </div>
      <div className='submit' onClick={handleSubmit}>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="tables">
        {incomeData.length > 0 &&
        <IncomeTable data={incomeData} />
        }
        {educationData.length > 0 &&
        <EducationTable data={educationData} />
        }
        {incomeEducationData.length > 0 &&
        <IncomeEducationTable
          data={incomeEducationData}
          region={region}
          dropdown1={dropdown1}
          dropdown2={dropdown2}
          dropdown3={dropdown3}
          dropdown4={dropdown4} 
        />
        }
      </div>
    </div>
  );
}

export default App;