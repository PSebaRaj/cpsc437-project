import React from 'react';
import './RadioButton.css';

const RadioButton = (props) => {

  const { region, handleRegionChange } = props;

  return (
    <div>
        <p>Choose a region to analyze:</p>
        <div className='radioButtonsLabels'>
            <label>
            <input
                type="radio"
                name="location"
                value="national"
                checked={region === 'national'}
                onChange={handleRegionChange}
            />
            National
            </label>
            <label>
            <input
                type="radio"
                name="location"
                value="state"
                checked={region === 'state'}
                onChange={handleRegionChange}
            />
            State
            </label>
            <label>
            <input
                type="radio"
                name="location"
                value="county"
                checked={region === 'county'}
                onChange={handleRegionChange}
            />
            County
            </label>
        </div>
    </div>
  );
}

export default RadioButton;