import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../api/data';
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(() => {
    return parseInt(localStorage.getItem(id)) || 0;
  });

  const handleRateChange = (rating) => {
    setUserRating(rating);
  };
  useEffect(() => {
    localStorage.setItem(id, userRating.toString())
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

  const addToFavorites = (movie) => {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      if (!Array.isArray(favorites)) {
        favorites = [];
      }

      if (!favorites.some((favorite) => favorite.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Movie added to favorites!');
      } else {
        alert('Movie is already in favorites');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
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
            <button className="back-btn">Back</button>
          </Link>
          <button
            className="add-to-favorites-btn"
            onClick={() => addToFavorites(movie)}
          >
            Add To Favorites
          </button>
          <div className="user-rating-content">
            <StarRating value={userRating} onRate={handleRateChange} />
            <p>User Rating: {userRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
