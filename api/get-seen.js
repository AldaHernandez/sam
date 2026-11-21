import { supabase } from "../lib/supabase-server.js";
import { toClientItem } from "../lib/watchlist.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("watched", true)
      .order("watched_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error fetching seen list" });
    }

    return res.status(200).json(data.map(toClientItem));
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
