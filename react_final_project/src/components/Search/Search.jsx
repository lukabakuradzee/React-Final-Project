import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const Search = React.memo(({ data }) => {
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchQuery('');
        setFilteredData([]);
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <FormattedMessage id="search_placeholder" defaultMessage={`Search...`}>
      {(message) => (
        <>
          <div className="search-box">
            <input
              className="search"
              type="text"
              placeholder={message}
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="movie-search-info">
              <ul>
                {searchQuery !== '' && filteredData.length > 0
                  ? filteredData.map((item) => (
                      <div className="movie-search-result" key={item.id}>
                        <img src={item.thumbnail} alt="" />
                        <Link to={`/movie/${item.id}`}>
                          <li key={item.id}>{item.title}</li>
                          <li key={item.id}>{item.year}</li>
                          <li key={item.id}>{item.genre}</li>
                        </Link>
                      </div>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </>
      )}
    </FormattedMessage>
  );
});

export default Search;
