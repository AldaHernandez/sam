export default async function handler(req, res) {
  const query = req.query.q;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  // validación de que se está buscando algo y también de la API KEY
  if (!query) {
    return res.status(400).json({error: 'No se proveyó un término de búsqueda'});
  }
  if (!TMDB_API_KEY) {
    return res.status(500).json({error: 'API KEY no configurada'});
  }

  try {
    // petición a TMDB desde el servidor de Vercel CLI
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-MX&page=1`
    );

    if (!response.ok) {
      throw new Error('Fallo al conectar con TMDB');
    }

    const data = await response.json();

    // recorriendo cada elemento del objeto movies
    const movies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : null
    }));

    // respuesta para el frontend con el json movies
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}