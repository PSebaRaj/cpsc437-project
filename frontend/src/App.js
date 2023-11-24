import React, { useState } from 'react';
import './App.css';
import Dropdown from './Components/Dropdown/Dropdown';
import RadioButton from './Components/RadioButton/RadioButton';
import axios from 'axios';
import Checkbox from './Components/Checkbox/Checkbox';

function App() {
  const [region, setRegion] = useState('');
  const [income, setIncome] = useState(false);
  const [education, setEducation] = useState(false);
  const [data, setData] = useState([]);
  const [dropdown1, setDropDown1] = useState("");
  const [dropdown2, setDropDown2] = useState("");
  const [dropdown3, setDropDown3] = useState("");
  const [dropdown4, setDropDown4] = useState("");
  const [countyOptions, setCountyOptions] = useState([]);

  const nationalOptions = [
    { value: "N/A", label: "----Select a country----" },
    { value: 'USA', label: 'United States of America' },
  ];

  const stateOptions = [
    { value: "N/A", label: "----Select a state----" },
    { value: "All", label: "All States" },
    { value: 'Alabama', label: 'Alabama' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Arizona', label: 'Arizona' },
    { value: 'Arkansas', label: 'Arkansas' },
    { value: 'California', label: 'California' },
    { value: 'Colorado', label: 'Colorado' },
    { value: 'Connecticut', label: 'Connecticut' },
    { value: 'Delaware', label: 'Delaware' },
    { value: 'Florida', label: 'Florida' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Hawaii', label: 'Hawaii' },
    { value: 'Idaho', label: 'Idaho' },
    { value: 'Illinois', label: 'Illinois' },
    { value: 'Indiana', label: 'Indiana' },
    { value: 'Iowa', label: 'Iowa' },
    { value: 'Kansas', label: 'Kansas' },
    { value: 'Kentucky', label: 'Kentucky' },
    { value: 'Louisiana', label: 'Louisiana' },
    { value: 'Maine', label: 'Maine' },
    { value: 'Maryland', label: 'Maryland' },
    { value: 'Massachusetts', label: 'Massachusetts' },
    { value: 'Michigan', label: 'Michigan' },
    { value: 'Minnesota', label: 'Minnesota' },
    { value: 'Mississippi', label: 'Mississippi' },
    { value: 'Missouri', label: 'Missouri' },
    { value: 'Montana', label: 'Montana' },
    { value: 'Nebraska', label: 'Nebraska' },
    { value: 'Nevada', label: 'Nevada' },
    { value: 'New Hampshire', label: 'New Hampshire' },
    { value: 'New Jersey', label: 'New Jersey' },
    { value: 'New Mexico', label: 'New Mexico' },
    { value: 'New York', label: 'New York' },
    { value: 'North Carolina', label: 'North Carolina' },
    { value: 'North Dakota', label: 'North Dakota' },
    { value: 'Ohio', label: 'Ohio' },
    { value: 'Oklahoma', label: 'Oklahoma' },
    { value: 'Oregon', label: 'Oregon' },
    { value: 'Pennsylvania', label: 'Pennsylvania' },
    { value: 'Rhode Island', label: 'Rhode Island' },
    { value: 'South Carolina', label: 'South Carolina' },
    { value: 'South Dakota', label: 'South Dakota' },
    { value: 'Tennessee', label: 'Tennessee' },
    { value: 'Texas', label: 'Texas' },
    { value: 'Utah', label: 'Utah' },
    { value: 'Vermont', label: 'Vermont' },
    { value: 'Virginia', label: 'Virginia' },
    { value: 'Washington', label: 'Washington' },
    { value: 'West Virginia', label: 'West Virginia' },
    { value: 'Wisconsin', label: 'Wisconsin' },
    { value: 'Wyoming', label: 'Wyoming' },
  ];

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
        if (region === "national" && income && !education) console.log("Get USA's income")
        if (region === "national" && education && !income) console.log("Get USA's education")
        if (region === "national" && education && income) console.log("Get USA's income and education")
        if (region === "state") {
          if (dropdown2.length === 0) {
            if (dropdown1 === "All") {
              if (income && !education) url = "stateIncome"
              if (!income && education) url = "stateEducation"
              if (income && education) url = "state"
            } else {
              if (income && !education) console.log("Get state's income")
              if (!income && education) console.log("Get state's education")
              if (income && education) url = "state/" + dropdown1
            }
          } else {
            if (income && !education) console.log("Get state 1 and state 2 income")
            if (!income && education) console.log("Get state 1 and state 2 education")
            if (income && education) console.log("Get state 1 and 2 income and education")
          }
        }
        if (region === "county") {
          if (dropdown3.length === 0 || dropdown4.length === 0) {
            if (dropdown2 === "All") {
              if (income && !education) url = "countyIncome"
              if (!income && education) url = "countyEducation"
              if (income && education) url = "county"
            } else {
              if (income && !education) console.log("Get county (in state) income")
              if (!income && education) console.log("Get county (in state) education")
              if (income && education) url = "county/" + dropdown1 + "/" + dropdown2
            }
          } else {
            if (income && !education) console.log("Get county 1 and county 2 income")
            if (!income && education) console.log("Get county 1 and county 2 education")
            if (income && education) console.log("Get county 1 and 2 income and education")
          }
        }
        axios.get(baseUrl + url)
          .then(response => {
            console.log('Response:', response.data);
            setData(response.data);
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
  }

  return (
    <div>
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
          options={region === "national" ? nationalOptions : region === "state" ? stateOptions : countyOptions}
          handleDropdown1Change={handleDropdown1Change}
          handleDropdown2Change={handleDropdown2Change}
          handleDropdown3Change={handleDropdown3Change}
          handleDropdown4Change={handleDropdown4Change}
        />
      </div>
      }
      <div className="checkbox">
        <Checkbox handleEducationChange={handleEducationChange} handleIncomeChange={handleIncomeChange} />
      </div>
      <div className='submit' onClick={handleSubmit}>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;