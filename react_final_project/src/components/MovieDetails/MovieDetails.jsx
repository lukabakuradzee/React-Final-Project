import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../api/fetchData';
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { removeFromFavorites } from './RemoveFavorites';
import { addToFavorites } from './AddToFavorites';
import { FormattedMessage } from 'react-intl';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useAuthContext();
  const [userRating, setUserRating] = useState(() => {
    return parseInt(localStorage.getItem(id)) || 0;
  });

  const handleRateChange = (rating) => {
    setUserRating(rating);
  };
  const addMovieMessage = (
    <FormattedMessage
      id="movie_added_in_favorites_alert"
      defaultMessage={`The movie has been added to favorites.`}
    />
  );
  const removeMovieMessage = (
    <FormattedMessage
      id="movie_removed_in_favorites_alert"
      defaultMessage={`This movie has been removed from your favorites.`}
    />
  );

  const addMovieMessageText = addMovieMessage.props.defaultMessage;
  const removeMovieMessageText = removeMovieMessage.props.defaultMessage;

  useEffect(() => {
    localStorage.setItem(id, userRating.toString());
    const fetchMovieDetails = async () => {
      try {
        const movieData = await fetchData();
        const selectedMovie = movieData.find((movie) => movie.id === id);

        if (selectedMovie) {
          setMovie(selectedMovie);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, userRating]);

  // ADD TO FAVORITES
  const AddToFavoritesHandler = (movie) => {
    addToFavorites(state, movie);
    alert(addMovieMessageText);
  };

  // Remove From Favorites
  const removeFromFavoritesHandler = (movieId) => {
    removeFromFavorites(state, movieId);
    alert(removeMovieMessageText);
  };

  if (loading) {
    return (
      <div className="bar-loader" style={{}}>
        <BarLoader color="#ffd000de" />
      </div>
    );
  }

  // WHEN MOVIE DETAILS NOT FOUND

  if (!movie) {
    return <div>No movie details found</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <div className="movie-info">
        <figcaption>
          <img src={movie.image} alt={movie.title} />
        </figcaption>
        <div className="movie-description">
          <p>
            <span>Rating: </span>
            {movie.rating}
            <img
              className="imdb-logo"
              src="https://www.justwatch.com/appassets/img/imdb-logo.png"
              alt=""
            />
          </p>
          <p>
            <span>Year:</span> {movie.year}
          </p>
          <p>
            <span>Genre:</span> {movie.genre.join(', ')}
          </p>
          <p>
            <span>Description:</span> {movie.description}
          </p>
          <p>
            <span>IMDB-ID:</span> {movie.imdbid}
          </p>
          <p>
            <span>IMDB:</span>{' '}
            <a href="https://www.imdb.com/title/tt0068646" target="blank">
              {movie.imdb_link}
            </a>
          </p>
          <Link to={`/`}>
            <button className="back-btn">
              <FormattedMessage id="back" defaultMessage={`Back`} />
            </button>
          </Link>
          <button
            className="add-to-favorites-btn"
            onClick={() => AddToFavoritesHandler(movie)}
          >
            <FormattedMessage
              id="button_add_favorites"
              defaultMessage={`Add To Favorites`}
            />
          </button>
          <button
            className="remove-from-favorites-btn"
            onClick={() => removeFromFavoritesHandler(movie.id)}
          >
            <FormattedMessage
              id="button_remove_favorites"
              defaultMessage={`Remove From Favorites`}
            />
          </button>
          <div className="user-rating-content">
            <StarRating value={userRating} onRate={handleRateChange} />
            <p>
              <FormattedMessage
                id="user_rating"
                defaultMessage={`User Rating`}
              />
              : {userRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
