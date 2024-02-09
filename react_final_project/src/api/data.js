import React, { useEffect, useState } from 'react';
import MovieCard from '../components/Cards/MovieCard';
import { BarLoader } from 'react-spinners';
import GenreFilter from '../components/Cards/GenreFilter';
import Search from '../components/Search/Search';

 export const fetchData = async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd2a00f8c06msh867e7091c05c0e4p18a7b3jsn2e66161823a2',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return Array.isArray(result) ? result : [result];
    } catch (error) {
     throw new Error("Failed to fetch movie data :", + error.message)
  };
}


const Data = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 21;

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const movies = await fetchData();
        setMovieData(movies);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndSetState();
  }, []);


  const handleGenreChange = (genre) => {
    setSelectedGenre((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre],
    );
  };

  

  // Apply filters and pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieData
    .filter(
      (movie) =>
        selectedGenre.length === 0 ||
        selectedGenre.every((genre) => movie.genre.includes(genre)),
    )
    .slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Search  data={movieData} />
      <GenreFilter
        selectedGenres={selectedGenre}
        handleGenreChange={handleGenreChange}
      />
      <div className="movie-list">
        {error && <h2>Something Happened</h2>}
        {loading && (
          <div className="bar-loader" style={{}}>
            <BarLoader color="#36d7b7" />
          </div>
        )}

        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({
          length: Math.ceil(movieData.length / moviesPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'activePage' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Data;
