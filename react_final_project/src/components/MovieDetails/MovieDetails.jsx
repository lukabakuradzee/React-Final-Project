import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../api/data'; 
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMovieDetails = async () => { // Rename the function to avoid conflicts
      try {
        const movieData = await fetchData(); // Fetch movie data
        const selectedMovie = movieData.find((movie) => movie.id === id);

        if (selectedMovie) {
          setMovie(selectedMovie);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails(); // Call the renamed function
  }, [id]);

  if (loading) {
    return <div className="bar-loader" style={{}}>
    <BarLoader color="#ffd000de" />
  </div>
  }

  if (!movie) {
    return <div>No movie details found</div>;
  }

  return (
    <div className="movie-details">
       <h2>{movie.title}</h2>
       <div className='movie-info'>
       <figcaption>
        <img src={movie.image} alt={movie.title} />
        </figcaption>
        <div className='movie-description'>
      <p>
        <span>Rating: </span>
       {movie.rating}
       <img className='imdb-logo' src="https://www.justwatch.com/appassets/img/imdb-logo.png" alt="" />
        </p>
      <p><span>Year:</span> {movie.year}</p>
      <p><span>Genre:</span> {movie.genre.join(', ')}</p>
      <p><span>Description:</span> {movie.description}</p>
      <p><span>IMDB:</span> <a href="https://www.imdb.com/title/tt0068646" target='blank'>{movie.imdb_link}</a></p>
      <Link to={`/`}><button className='back-btn'>Back</button></Link>
      </div>
      </div>
    </div>
  );
};

export default MovieDetails;
