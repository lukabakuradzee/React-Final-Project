// import Cookies from "js-cookie";

import Cookies from "js-cookie";

export const paginate = (
  currentPageMovies,
  currentPage,
  moviesPerPage,
  selectedGenre,
) => {
  if (!Array.isArray(currentPageMovies)) {
    return { currentMovies: [], totalPages: 0 };
  }
  const filteredMovies = currentPageMovies.filter(
    (movie) =>
      selectedGenre.length === 0 ||
      selectedGenre.every((genre) => movie.genre.includes(genre))
  );
  const totalMovies = filteredMovies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  

  return { currentMovies, totalPages };
};
