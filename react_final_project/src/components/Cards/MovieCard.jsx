import React from 'react';

const MovieCard = ({ movie }) => {
    
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p><span>Rating:</span> {movie.rating}</p>
      <p><span>Year:</span> {movie.year}</p>
      <p><span>Genre:</span> {movie.genre.join(', ')}</p>
      <p><span>Description:</span> {movie.description}</p>
    </div>
  );
};
export default MovieCard;