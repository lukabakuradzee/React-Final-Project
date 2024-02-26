import React, { useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';
import { useAuthContext } from '../../context/auth/AuthContextProvider';

function FavoriteMoviesModal() {
  const { state } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [favoriteMovieCount, setFavoriteMovieCount] = useState(0);

  useEffect(() => {
    const updateFavoriteMovieCount = () => {
      const userFavoriteKey = `favorites_${state.user.userID}`;
      const favoritesData = localStorage.getItem(userFavoriteKey);
      if (favoritesData) {
        const favorites = JSON.parse(favoritesData);
        const count = favorites.length;
        setFavoriteMovieCount(count);
      }
    };

    if (state.isAuthenticated && state.user && state.user.userID) {
      updateFavoriteMovieCount();
    }

    const handleStorageChange = (event) => {
      if (event.key === `favorites_${state.user.userID}` || event.type === 'favoritesChanged') {
        updateFavoriteMovieCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [state.isAuthenticated, state.user]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const updateFavorites = () => {
    const event = new Event('favoritesChanged');
    window.dispatchEvent(event);
  };

  return (
    <div>
      <div className="favorites-box" tabIndex="1">
        <button onClick={toggleModal}>
          Watchlist
          <span className="favorite-movie-quantity">{favoriteMovieCount}</span>
        </button>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
              <FavoritesList toggleModal={toggleModal} updateFavorites={updateFavorites}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteMoviesModal;
