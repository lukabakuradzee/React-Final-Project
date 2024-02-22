export const addToFavorites = (state, movie) => {
  try {
    if (!state.isAuthenticated || !state.user || !state.user.userID) {
      return;
    }
    const userFavoriteKey = `favorites_${state.user.userID}`;
    let favorites = JSON.parse(localStorage.getItem(userFavoriteKey)) || [];

    if (!Array.isArray(favorites)) {
      favorites = [];
    }

    if (!favorites.some((favorite) => favorite.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem(userFavoriteKey, JSON.stringify(favorites));
    } else {
      alert('Movie is already in favorites');
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};
