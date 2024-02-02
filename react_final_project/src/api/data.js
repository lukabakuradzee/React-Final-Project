import React, { useEffect, useState } from 'react';
import MovieCard from '../components/Cards/MovieCard';

function Data() {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '80c9898a3cmshf3624ba623f3802p182df4jsnbcf7a7d42add',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const moviesArray = Array.isArray(result) ? result : [result];
        setMovieData(moviesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="movie-list">
      {movieData.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Data;
