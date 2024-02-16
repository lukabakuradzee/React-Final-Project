export const removeFromFavorites = (state, movieId) => {
  try {
    if (!state.isAuthenticated || !state.user || !state.user.userID) {
      return;
    }
    const userFavoriteKey = `favorites_${state.user.userID}`;
    let favorites = JSON.parse(localStorage.getItem(userFavoriteKey)) || [];
    if (!Array.isArray(favorites)) {
      favorites = [];
    }
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== movieId,
    );
    localStorage.setItem(userFavoriteKey, JSON.stringify(updatedFavorites));
  } catch (error) {
    alert('Error from removing favorite', error);
  }
};



