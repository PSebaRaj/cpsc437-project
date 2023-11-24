import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
  const { region, options, handleDropdown1Change, handleDropdown2Change, handleDropdown3Change, handleDropdown4Change } = props;

  const states = [
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

  const handleDropdown1 = (event) => {
    const selectedValue = event.target.value;
    handleDropdown1Change(selectedValue);
  };

  const handleDropdown2 = (event) => {
    const selectedValue = event.target.value;
    handleDropdown2Change(selectedValue);
  };

  const handleDropdown3 = (event) => {
    const selectedValue = event.target.value;
    handleDropdown3Change(selectedValue);
  };

  const handleDropdown4 = (event) => {
    const selectedValue = event.target.value;
    handleDropdown4Change(selectedValue);
  };

  return (
    <div className='dropdown-body'>
      {region === "county" ?
      <div className='dropdown-body'>
        <div className="dropdown-section">
          <p>State</p>
          <select onChange={handleDropdown1}>
            {states.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-section">
          <p>{region.charAt(0).toUpperCase() + region.slice(1)}</p>
          <select onChange={handleDropdown2}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-section">
          <p>State #2 {" (optional)"}</p>
          <select onChange={handleDropdown3}>
            {states.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-section">
          <p>{region.charAt(0).toUpperCase() + region.slice(1)} #2 {" (optional)"}</p>
          <select onChange={handleDropdown4}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      : region === "state" &&
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
      }
    </div>
  );
};

export default Dropdown;