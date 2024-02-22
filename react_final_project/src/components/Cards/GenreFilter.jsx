import React from 'react';
import { FormattedMessage } from 'react-intl';

const GenreFilter = React.memo(({ selectedGenres, handleGenreChange }) => {
  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance', 'History', 'Mystery', 'Thriller', 'Crime', 'Adventure', 'Fantasy'];
  console.log("Movie Genre: ", genres)

  return (
    <div className="movie-filter">
      {genres.map((genre) => (
        <label key={genre}>
          <input
            type="checkbox"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={() => handleGenreChange(genre)}
            />
          <FormattedMessage id={genre} defaultMessage={genre} />
        </label>
      ))}
    </div>
  );
  
});

export default GenreFilter;
