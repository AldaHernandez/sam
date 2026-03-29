// file for SERVER-SIDE use only (API routes)
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL:", supabaseUrl ? "EXISTS" : "MISSING");
  console.error("Supabase Key:", supabaseAnonKey ? "EXISTS" : "MISSING");
  throw new Error("Missing Supabase URL or Key from server");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
