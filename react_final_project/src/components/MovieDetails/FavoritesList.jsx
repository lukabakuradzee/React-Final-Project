import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

  }, []);

  return (
    <div>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((movie, index) => (
           <Link to={`movie/${movie.id}`}><li key={index}>{movie.title}</li></Link>
          ))}
        </ul>
      ) : (
        <p>No favorite movies yet</p>
      )}
    </div>
  );
};

export default FavoritesList;
