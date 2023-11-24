import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {

  const { handleEducationChange, handleIncomeChange } = props;

  return (
    <div>
        <p>Choose a metric to analyze:</p>
        <div className='radioButtonsLabels'>
            <label>
            <input
                type="checkbox"
                name="metric"
                value="income"
                onChange={handleIncomeChange}
            />
            Income
            </label>
            <label>
            <input
                type="checkbox"
                name="metric"
                value="education"
                onChange={handleEducationChange}
            />
            Education
            </label>
        </div>
    </div>
  );
}

export default Checkbox;