import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
  const { region, options } = props;

  return (
    <div className='dropdown-body'>
      <div className="dropdown-section">
        <p>{region.charAt(0).toUpperCase() + region.slice(1)}</p>
        <select>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {region !== "national" && (
        <div className="dropdown-section">
          <p>{region.charAt(0).toUpperCase() + region.slice(1)} #2 {" (optional)"}</p>
          <select>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Dropdown;