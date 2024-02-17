import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const Search = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase(); 
    setSearchQuery(query);

    if (query.length === 2 || query.length === 3 || query.length === 4) {
      const filtered = data.filter((item) => {
        if (item && item.title) {
          const itemTitle = item.title.toLowerCase();
          return itemTitle.includes(query);
        } else {
          return false;
        }
      });

      setFilteredData(filtered);
    }
  };
  return (
    <FormattedMessage id='search_placeholder' defaultMessage={`Search...`}>
    {(message) => (
      <>
        <div className="search-box">
          <input
            className='search'
            type="text"
            placeholder={message}
            value={searchQuery}
            onChange={handleSearch}
          />
        <ul>
          {searchQuery !== '' && filteredData.length > 0
            ? filteredData.map((item) => <li key={item.id}>{item.title}</li>)
            : null}
        </ul>
        </div>
      </>
    )}
  </FormattedMessage>
  )  
};

export default Search;
