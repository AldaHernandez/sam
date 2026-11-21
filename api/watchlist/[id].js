import { supabase } from "../../lib/supabase-server.js";

// PATCH /api/watchlist/:id
// body: { watched?: boolean, rating?: number | null }
// Used both to mark an item as seen/unseen and to rate it.
export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!/^\d+$/.test(String(id))) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const { watched, rating } = req.body ?? {};
  const update = {};

  if (watched !== undefined) {
    if (typeof watched !== "boolean") {
      return res.status(400).json({ error: "watched must be a boolean" });
    }
    update.watched = watched;
    // keep the date of the last time it was marked as seen
    update.watched_at = watched ? new Date().toISOString() : null;
    // un-marking as seen clears the rating, unless a new one is sent
    if (!watched && rating === undefined) update.rating = null;
  }

  if (rating !== undefined) {
    // MUI Rating supports half steps: 0.5 .. 5
    const valid =
      rating === null ||
      (typeof rating === "number" &&
        rating >= 0.5 &&
        rating <= 5 &&
        Number.isInteger(rating * 2));
    if (!valid) {
      return res
        .status(400)
        .json({ error: "rating must be null or a multiple of 0.5 between 0.5 and 5" });
    }
    update.rating = rating;
  }

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .update(update)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Error updating the item" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Item not found on the list" });
    }

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
