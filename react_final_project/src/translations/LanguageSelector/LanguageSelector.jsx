import Cookies from 'js-cookie';
import React, { useState } from 'react';

const LanguageSelector = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Cookies.get('locale') || 'en');

  const handleChange = (e) => {
    const selectedLocale = e.target.value;
    onLanguageChange(selectedLocale);
    setSelectedLanguage(selectedLocale);
    Cookies.set('locale', selectedLocale);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Select Language: </label>
      <select value={selectedLanguage} id="language-select" onChange={handleChange}>
        <option value="en">English</option>
        <option value="ka">Georgian</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
