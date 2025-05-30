export async function favoriteClickHandler(
  isFavorite,
  setIsFavorite,
  setLoadingFavorite,
  onFavorite,
  id
) {
  setLoadingFavorite(true);
  try {
    const newVal = !isFavorite;
    setIsFavorite(newVal);
    if (onFavorite) {
      await onFavorite(id, newVal);
    }
  } catch (err) {
    // Reverte em caso de erro
    setIsFavorite((prev) => !prev);
  } finally {
    setLoadingFavorite(false);
  }
}
