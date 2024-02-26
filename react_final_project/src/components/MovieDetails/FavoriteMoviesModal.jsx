import React from 'react';
import FavoritesList from './FavoritesList';
import { useState, useEffect } from 'react';

function FavoriteMoviesModal() {
  const [modalOpen, setModalOpen] = useState(false);

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
          <i className="fa-solid fa-clapperboard favorite-movie-icon"></i>
        </button>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
              <FavoritesList toggleModal={toggleModal}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteMoviesModal;
