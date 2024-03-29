import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { FormattedMessage } from 'react-intl';

const FavoritesList = ({ toggleModal }) => {
  const { state } = useAuthContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated && state.user && state.user.userID) {
      const userFavoriteKey = `favorites_${state.user.userID}`;
      const storedFavorites =
        JSON.parse(localStorage.getItem(userFavoriteKey)) || [];
      setFavorites(storedFavorites);
      console.log(storedFavorites)
    }
  }, [state.isAuthenticated, state.user]);


  return (
    <div className="favorite-movie-list">
      {state.isAuthenticated ? (
        favorites.length > 0 ? (
          <ul>
            {favorites.map((movie, index) => (
              <Link
                to={`movie/${movie.id}`}
                key={index}
                onClick={() => {
                  toggleModal();
                }}
              >
                <li>{movie.title}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>
            <FormattedMessage
              id="no_fav_movies_yet"
              defaultMessage={'No favorite movies yet.'}
            />
          </p>
        )
      ) : (
        <p>
          <FormattedMessage
            id="favorite_movies_txt1"
            defaultMessage={'Please log in to see your favorite movies.'}
          />
        </p>
      )}
    </div>
  );
};

export default FavoritesList;
