import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {

  const { education, income, handleEducationChange, handleIncomeChange } = props;

  return (
    <div>
        <p>Choose a metric to analyze:</p>
        <div className='radioButtonsLabels'>
            <label>
            <input
                type="checkbox"
                name="metric"
                value="income"
                checked={income}
                onChange={handleIncomeChange}
            />
            Income
            </label>
            <label>
            <input
                type="checkbox"
                name="metric"
                value="education"
                checked={education}
                onChange={handleEducationChange}
            />
            Education
            </label>
        </div>
    </div>
  );
}

export default Checkbox;