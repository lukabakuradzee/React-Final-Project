import React, { useEffect, useState } from 'react';
import { fetchData } from './fetchData';
import MovieCard from '../components/Cards/MovieCard';
import { BarLoader } from 'react-spinners';
import GenreFilter from '../components/Cards/GenreFilter';
import Search from '../components/Search/Search';
import { useCallback } from 'react';
import { paginate } from '../utils/pagination';

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


  const { currentMovies, totalPages } = paginate(
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
        {Array.from({ length: totalPages }).map((_, index) => (
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
