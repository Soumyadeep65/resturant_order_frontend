import React from 'react';
import './OptionSelector.css';

const OptionSelector = ({ optionList, selectedOptions, setSelectedOptions, isMultiSelect }) => {
  const handleSelectOption = (option) => {
    if (isMultiSelect) {
      setSelectedOptions(prev => {
        if (prev.some(opt => opt.id === option.id)) {
          return prev.filter(opt => opt.id !== option.id);
        } else {
          return [...prev, option];
        }
      });
    } else {
      setSelectedOptions(prev => {
        const filteredOptions = prev.filter(opt => !optionList.options.some(o => o.id === opt.id));
        return [...filteredOptions, option];
      });
    }
  };

  return (
    <div className="option-selector">
      <h3>{optionList.name}</h3>
      {optionList.options.map(option => (
        <div key={option.id}>
          <input
            type={isMultiSelect ? "checkbox" : "radio"}
            name={`option-${optionList.id}`}
            value={option.id}
            checked={selectedOptions.some(opt => opt.id === option.id)}
            onChange={() => handleSelectOption(option)}
          />
          {option.name} {option.surcharge && `(Surcharge: $${option.surcharge})`}
        </div>
      ))}
    </div>
  );
};

export default OptionSelector;
