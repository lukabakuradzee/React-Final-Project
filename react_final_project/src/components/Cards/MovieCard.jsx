import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../MovieDetails/StarRating';
import { FormattedMessage } from 'react-intl';

const MovieCard = React.memo(({ movie }) => {
  const [userRating, setUserRating] = useState(() => {
    return parseInt(localStorage.getItem(movie.id)) || 0;
});

useEffect(() => {
  localStorage.setItem(movie.id, userRating.toString())
}, [movie.id, userRating])


  const handleRateChange = (rating) => {
    setUserRating(rating);
  };


  return (
    <div className="movie-card" key={movie.id}>
      <img src={movie.image} alt={movie.title} />
      <p>
        <span>Rating: </span>
        {movie.rating}
        <img className='imdb-logo' src="https://www.justwatch.com/appassets/img/imdb-logo.png" alt="" />
      </p>
      <div className='movie-card-bottom'>
      <Link to={`/movie/${movie.id}`}><button><FormattedMessage id="button_movie_details" defaultMessage={"Watchlist"} /></button></Link>
      <h2>{movie.title}</h2>
      <div className='user-rating-content'>
        <StarRating value={userRating} onRate={handleRateChange} />
        <p>User Rating: {userRating}</p>
      </div>
      </div>
    </div>
  );
});

export default MovieCard;
