import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p>Rating: {movie.rating}</p>
      <p>Year: {movie.year}</p>
      <p>Genre: {movie.genre}</p>
      <p>Description: {movie.description}</p>
      <p>Director: {movie.director}</p>
      {/* <iframe src={movie.trailer_embed_link}
      width="560"
      height="315" frameborder="0"></iframe> */}
    </div>
  );
};

export default MovieCard;
