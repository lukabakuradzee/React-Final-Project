import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../MovieDetails/StarRating';
import { FormattedMessage } from 'react-intl';
import { addToFavorites } from '../MovieDetails/AddToFavorites';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { removeFromFavorites } from '../MovieDetails/RemoveFavorites';

const MovieCard = React.memo(({ movie }) => {
  const { state } = useAuthContext();
  const [userRating, setUserRating] = useState(() => {
    return parseInt(localStorage.getItem(movie.id)) || 0;
  });
  const [isInFavorites, setIsInFavorites] = useState(() => {
    return localStorage.getItem(`${movie.id}_isInFavorites`) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(movie.id, userRating.toString());
  }, [movie.id, userRating]);

  const handleRateChange = (rating) => {
    setUserRating(rating);
  };

  const handleToggleFavorites = () => {
    if (isInFavorites) {
      removeFromFavorites(state, movie.id);
      setIsInFavorites(false);
      localStorage.setItem(`${movie.id}_isInFavorites`, 'false');
    } else {
      addToFavorites(state, movie);
      setIsInFavorites(true);
      localStorage.setItem(`${movie.id}_isInFavorites`, 'true');
    }
  };

  const iconClassName = isInFavorites
    ? 'fa-solid fa-check check-icon-watchlist'
    : 'fa-solid fa-plus plus-icon-watchlist';

  return (
    <div className="movie-card">
      <i className="fa-solid fa-plus plus-icon"></i>
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.image} alt={movie.title} />
      </Link>
      <p className="movie-rating-txt">
        <span>Rating: </span>
        {movie.rating}
        <img
          className="imdb-logo"
          src="https://www.justwatch.com/appassets/img/imdb-logo.png"
          alt=""
        />
      </p>
      <div className="movie-card-bottom">
        <button
          className="watchlist-button"
          key={movie.id}
          onClick={() => handleToggleFavorites(movie)}
        >
          <i className={`${iconClassName}`}></i>

          <FormattedMessage
            id="button_movie_details"
            defaultMessage={'Watchlist'}
          />
        </button>
        <h2>{movie.title}</h2>
        <div className="user-rating-content">
          <StarRating value={userRating} onRate={handleRateChange} />
          <p>User Rating: {userRating}</p>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
