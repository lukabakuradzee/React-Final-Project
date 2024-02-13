import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    
  return (
    <div className="movie-card">

      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p>
        <span>Rating: </span>
        {movie.rating}
        <img className='imdb-logo' src="https://www.justwatch.com/appassets/img/imdb-logo.png" alt="" />
        </p>
      <p><span>Year:</span> {movie.year}</p>
      <p><span>Genre:</span> {movie.genre.join(', ')}</p>
      <p><span>Description:</span> {movie.description}</p>
      <Link to={`/movie/${movie.id}`}><button>View Details</button></Link>

    </div>
  );
};
export default MovieCard;