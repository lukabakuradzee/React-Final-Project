import React from 'react';
import FavoritesList from './FavoritesList';
import { useState } from 'react';

function FavoriteMoviesModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className='favorites-box'>
      <button onClick={toggleModal}>
        <i className="fa-solid fa-clapperboard favorite-movie-icon"></i>
      </button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <FavoritesList />
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoriteMoviesModal;
