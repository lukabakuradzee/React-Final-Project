export const paginate = (movieData, currentPage, moviesPerPage, selectedGenre) => {
    if(!Array.isArray(movieData)) {
        return [];
    }
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movieData
      .filter(
        (movie) =>
          selectedGenre.length === 0 ||
          selectedGenre.every((genre) => movie.genre.includes(genre))
      )
      .slice(indexOfFirstMovie, indexOfLastMovie);
     
  
    return currentMovies;
};
