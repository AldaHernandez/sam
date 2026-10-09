import { supabase } from "../lib/supabase-server.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query; // id de la fila en Supabase (dbId)

    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }

    const { data, error } = await supabase
      .from("watchlist")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error al eliminar de la lista" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Item not found on the list" });
    }

    return res.status(200).json({
      success: true,
      data: data[0],
      message: "Successfully removed from the list!",
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}