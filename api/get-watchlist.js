import { supabase } from "../lib/supabase-server.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("watched", false)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error al obtener la lista" });
    }

    const transformedData = data.map((item) => ({
      id: item.tmdb_id,
      title: item.title,
      year: item.year,
      posterUrl: item.poster_url,
      overview: item.overview,
      type: item.type,
      dbId: item.id, // include database id for deletion
    }));

    return res.status(200).json(transformedData);
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
