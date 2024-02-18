import React from 'react';
import { FormattedMessage } from 'react-intl';

const GenreFilter = React.memo(({ selectedGenres, handleGenreChange }) => {
  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance', 'History'];

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
          <FormattedMessage id={`genres.${genre}`} defaultMessage={genre} />
          {console.log(`'FormattedMessage id:' genres.${genre}`)}
        </label>
      ))}
    </div>
  );
});
export default GenreFilter;
