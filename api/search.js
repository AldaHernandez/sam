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
      `https://api.themoviedb.org/3/search/multi?include_adult=true&api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error('Fallo al conectar con TMDB');
    }

    const data = await response.json();

    // recorriendo cada elemento de data (la respuesta de la api)
    const items = data.results
    // .slice(0, 10) // mostrando solamente los 10 más relevantes
    .filter(item => item.media_type === 'movie' || item.media_type === 'tv') // filtrando por tipo película o serie 
    .map(item => ({
      id: item.id,
      type: item.media_type,
      title: item.title || item.name, // TMDB utiliza name para las series
      year: item.release_date 
      ? item.release_date.split('-')[0] 
      : item.first_air_date
        ? item.first_air_date.split('-')[0]
        : 'N/A', // también utiliza first_air_date para series
      posterUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
        : null,
      overview: item.overview,
    }));

    // respuesta para el frontend con el json items
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}