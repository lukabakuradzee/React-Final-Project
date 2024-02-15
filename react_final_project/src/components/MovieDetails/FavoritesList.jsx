import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/AuthContextProvider';

const FavoritesList = () => {
  const { state } = useAuthContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      const storedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    }
  }, [state.isAuthenticated]);

  return (
    <div className='favorite-movie-list'>
      {state.isAuthenticated ? (
        favorites.length > 0 ? (
          <ul>
            {favorites.map((movie, index) => (
              <Link to={`movie/${movie.id}`} key={index}>
                <li>{movie.title}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No favorite movies yet</p>
        )
      ) : (
        <p>Please log in to view your favorite movies.</p>
      )}
    </div>
  );
};

export default FavoritesList;
