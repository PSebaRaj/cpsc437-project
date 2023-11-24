import React, { useState } from 'react';
import './Dropdown.css';
import { states } from "../../constants";
import axios from 'axios';

const Dropdown = (props) => {
  const { region, options, handleDropdown1Change, handleDropdown2Change, handleDropdown3Change, handleDropdown4Change } = props;

  const stateOptions = states;
  const [countyOptions1, setCountyOptions1] = useState([{ value: "N/A", label: "----Select a state first----" }]);
  const [countyOptions2, setCountyOptions2] = useState([{ value: "N/A", label: "----Select a state first----" }]);

  const handleDropdown1 = (event) => {
    const selectedValue = event.target.value;
    if (region === "county") {
      axios.get(`http://localhost:3030/county-names/${selectedValue}`)
        .then(response => {
          const newCountyOptions = response.data.map(county => ({
            value: county,
            label: county
          }));
          let temp = [{ value: "N/A", label: "----Select a county----"}, ...newCountyOptions];
          setCountyOptions1(temp);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });
    }
    handleDropdown1Change(selectedValue);
  };

  const handleDropdown2 = (event) => {
    const selectedValue = event.target.value;
    handleDropdown2Change(selectedValue);
  };

  const handleDropdown3 = (event) => {
    const selectedValue = event.target.value;
    if (region === "county") {
      axios.get(`http://localhost:3030/county-names/${selectedValue}`)
        .then(response => {
          const newCountyOptions = response.data.map(county => ({
            value: county,
            label: county
          }));
          let temp = [{ value: "N/A", label: "----Select a county----"}, ...newCountyOptions];
          setCountyOptions2(temp);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });
    }
    handleDropdown3Change(selectedValue);
  };

  const handleDropdown4 = (event) => {
    const selectedValue = event.target.value;
    handleDropdown4Change(selectedValue);
  };

  return (
    <div className='dropdown-body'>
      {region === "county" ?
      <div>
        <div className='dropdown-body'>
          <div className="dropdown-section">
            <p>State</p>
            <select onChange={handleDropdown1}>
              {stateOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-section">
            <p>{region.charAt(0).toUpperCase() + region.slice(1)}</p>
            <select onChange={handleDropdown2}>
              {countyOptions1.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='dropdown-body'>
          <div className="dropdown-section">
            <p>State #2 {" (optional)"}</p>
            <select onChange={handleDropdown3}>
              {stateOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-section">
            <p>{region.charAt(0).toUpperCase() + region.slice(1)} #2 {" (optional)"}</p>
            <select onChange={handleDropdown4}>
              {countyOptions2.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      : region === "state" ?
        <div className='dropdown-body'>
          <div className="dropdown-section">
            <p>{region.charAt(0).toUpperCase() + region.slice(1)}</p>
            <select onChange={handleDropdown1}>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-section">
            <p>{region.charAt(0).toUpperCase() + region.slice(1)} #2 {" (optional)"}</p>
            <select onChange={handleDropdown2}>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        :
        <div className='dropdown-body'>
          <div className="dropdown-section">
            <p>{region.charAt(0).toUpperCase() + region.slice(1)}</p>
            <select onChange={handleDropdown1}>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;