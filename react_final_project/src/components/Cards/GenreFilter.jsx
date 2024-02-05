import React from 'react';

const GenreFilter = ({ selectedGenres, handleGenreChange }) => {
  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance'];

  return (
    <div className='movie-filter'>
      {genres.map((genre) => (
        <label key={genre}>
          <input
            type="checkbox"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={() => handleGenreChange(genre)}
          />
          {genre}
        </label>
      ))}
    </div>
  );
};

export default GenreFilter;
