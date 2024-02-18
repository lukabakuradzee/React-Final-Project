import Cookies from 'js-cookie';
import React from 'react';

const LanguageSelector = ({ onLanguageChange }) => {
  const handleChange = (e) => {
      if(e.MetaKey) {
          e.preventDefault();
      } 
      const selectedLanguage = e.target.value;
      onLanguageChange(selectedLanguage);
    }; 



  return (
    <div className="language-selector">
      <label htmlFor="language-select">Select Language: </label>
      <select value={Cookies.get('locale')} id="language-select" onChange={handleChange}>
        <option value="en">English</option>
        <option value="ka">Georgian</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
