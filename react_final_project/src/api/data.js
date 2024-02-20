import React, { useEffect, useState } from 'react';
import MovieCard from '../components/Cards/MovieCard';
import { BarLoader } from 'react-spinners';
import GenreFilter from '../components/Cards/GenreFilter';
import Search from '../components/Search/Search';
import { useCallback } from 'react';
import { paginate } from '../utils/pagination';

export const fetchData = async () => {
  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '12eaa2c047msh237261d4664f961p17b89djsn90feffa1c8d3',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return Array.isArray(result) ? result : [result];
  } catch (error) {
    throw new Error('Failed to fetch movie data :', +error.message);
  }
};

const Data = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 21;

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const movies = await fetchData();
        setMovieData(movies);
      } catch (error) {
        setError('Error while fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndSetState();
  }, []);

  const handleGenreChange = useCallback(
    (genre) => {
      setSelectedGenre((prevGenres) =>
        prevGenres.includes(genre)
          ? prevGenres.filter((g) => g !== genre)
          : [...prevGenres, genre],
      );
    },
    [setSelectedGenre],
  );

  // Apply filters and pagination
  const {currentMovies, totalPages} = paginate(
    movieData,
    currentPage,
    moviesPerPage,
    selectedGenre,
  );
  const paginateHandler = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Search data={movieData} />
      <GenreFilter
        selectedGenres={selectedGenre}
        handleGenreChange={handleGenreChange}
      />
      <div className="movie-list">
        {error && <h1>{error}</h1>}
        {loading && (
          <div className="bar-loader" style={{}}>
            <BarLoader color="#ffd000de" />
          </div>
        )}

        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({length: totalPages})
        .map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginateHandler(index + 1)}
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
