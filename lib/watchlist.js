// Shared mapping from a `watchlist` DB row to the shape the frontend uses
export function toClientItem(item) {
  return {
    id: item.tmdb_id,
    title: item.title,
    year: item.year,
    posterUrl: item.poster_url,
    overview: item.overview,
    type: item.type,
    dbId: item.id, // database id, used for updates/deletion
    watched: item.watched === true,
    rating: item.rating ?? null,
    watchedAt: item.watched_at ?? null,
  };
}
