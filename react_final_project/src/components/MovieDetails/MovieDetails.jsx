import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ movieData }) => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log('MovieData :', movieData)
    console.log('ID: ', id)
    const selectedMovie = movieData.find((movie) => movie.id === id);

    // Set the movie details in state and mark loading as false
    if (selectedMovie) {
      setMovie(selectedMovie);
      setLoading(false);
    }
  }, [id, movieData]);

 
  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (!movie) {
    return <div>No movie details found</div>;
  }

  
  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Genre: {movie.genre.join(', ')}</p>
      <p>Release Year: {movie.year}</p>
      <p>Description: {movie.description}</p>
    </div>
  );
};

export default MovieDetails;
