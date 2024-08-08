import React, { useState } from 'react';

function MultiSelectListbox() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div>
      <label htmlFor="checkbox-list" style={{ marginBottom: '10px', display: 'block' }}>Choose your options:</label>
      <div id="checkbox-list">
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <strong>Selected Options:</strong>
        <ul>
          {selectedOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MultiSelectListbox;
