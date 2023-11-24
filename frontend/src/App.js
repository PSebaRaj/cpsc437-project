import React, { useState } from 'react';
import './App.css';
import Dropdown from './Components/Dropdown/Dropdown';
import RadioButton from './Components/RadioButton/RadioButton';
import axios from 'axios';

function App() {
  const [region, setRegion] = useState('');

  const nationalOptions = [
    { value: "N/A", label: "----Select a country----" },
    { value: 'USA', label: 'United States of America' },
  ];

  const stateOptions = [
    { value: "N/A", label: "----Select a state----" },
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

  const countyOptions = [
    { value: "N/A", label: "----Select a county----" },
    { value: 'Baldwin', label: 'Baldwin County' },
    { value: 'LosAngeles', label: 'Los Angeles County' },
    { value: 'Cook', label: 'Cook County' },
    { value: 'Jefferson', label: 'Jefferson County' },
    { value: 'Suffolk', label: 'Suffolk County' },
    // Add more counties as needed...
  ];

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleSubmit = () => {
    if (region) {
      axios.get("http://localhost:3030/")
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.log('Please select a region');
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
        <Dropdown region={region} options={region === "national" ? nationalOptions : region === "state" ? stateOptions : countyOptions} />
      </div>
      }
      <div className='submit' onClick={handleSubmit}>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;