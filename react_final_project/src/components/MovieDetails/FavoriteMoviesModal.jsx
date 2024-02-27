import React, { useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';
import { useAuthContext } from '../../context/auth/AuthContextProvider';

function FavoriteMoviesModal() {
  const { state } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [favoriteMovieCount, setFavoriteMovieCount] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const userFavoriteKey = state.user ? `favorites_${state.user.userID}` : null;

    const updateFavoriteMovieCount = () => {
      if (userFavoriteKey) {
        const favoritesData = localStorage.getItem(userFavoriteKey);
        if (favoritesData) {
          const favorites = JSON.parse(favoritesData);
          setFavoriteMovieCount(favorites.length);
        } else {
          setFavoriteMovieCount(0);
        }
      }
    };

    updateFavoriteMovieCount();

    const handleStorageChange = (event) => {
      if (event.key === userFavoriteKey) {
        updateFavoriteMovieCount();
        setUpdateTrigger((prevTrigger) => !prevTrigger); // Trigger re-render
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [state.user, updateTrigger]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
              <FavoritesList toggleModal={toggleModal} updateTrigger={updateTrigger} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteMoviesModal;
