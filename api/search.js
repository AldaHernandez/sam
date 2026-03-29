export default async function handler(req, res) {
  const query = req.query.q;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  // Debug logging (remove this after it works)
  console.log("Search endpoint called");
  console.log("Query:", query);
  console.log("TMDB_API_KEY exists:", TMDB_API_KEY ? "YES" : "NO");

  // validación de que se está buscando algo y también de la API KEY
  if (!query) {
    return res
      .status(400)
      .json({ error: "No se proveyó un término de búsqueda" });
  }
  if (!TMDB_API_KEY) {
    console.error("❌ TMDB_API_KEY is undefined. Check your .env.local file!");
    return res.status(500).json({ error: "API KEY no configurada" });
  }

  try {
    // petición a TMDB desde el servidor de Vercel CLI
    const url = `https://api.themoviedb.org/3/search/multi?include_adult=true&api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1?append_to_response=vote_average`;

    console.log("Fetching from TMDB...");

    const response = await fetch(url);

    if (!response.ok) {
      console.error("❌ TMDB responded with:", response.status);
      throw new Error(`Fallo al conectar con TMDB: ${response.status}`);
    }

    const data = await response.json();
    console.log("TMDB responded with", data.results?.length || 0, "results");

    // recorriendo cada elemento de data (la respuesta de la api)
    const items = data.results
      // .slice(0, 10) // mostrando solamente los 10 más relevantes
      .filter((item) => item.media_type === "movie" || item.media_type === "tv") // filtrando por tipo película o serie
      .map((item) => ({
        id: item.id,
        type: item.media_type,
        title: item.title || item.name, // TMDB utiliza name para las series
        year: item.release_date
          ? item.release_date.split("-")[0]
          : item.first_air_date
            ? item.first_air_date.split("-")[0]
            : "N/A", // también utiliza first_air_date para series
        posterUrl: item.poster_path
          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
          : null,
        overview: item.overview,
      }));

    console.log("Returning", items.length, "filtered items");

    // respuesta para el frontend con el json items
    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Search API error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
