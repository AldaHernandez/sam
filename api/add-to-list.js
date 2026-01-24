import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    //only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed'});
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Supabase not configured'});
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const {id, type, title, year, posterUrl, overview} = req.body;

        if (!id || !title || !type) {
            return res.status(400).json({ error: 'Incomplete data'});
        }

        // supabase insert
        const {data, error} = await supabase
            .from('lista_conjunta') // table's name
            .insert([
                {
                    tmdb_id: id,
                    type: type,
                    title: title,
                    year: year,
                    poster_url: posterUrl,
                    overview: overview,
                    watched: false, // por defecto no vista
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            // duplicated error
            if (error.code === '23505') {
                return res.status(409).json({error: 'This movie/tv show is already on the list'});
            }
            throw error;
        }

        res.status(201).json({
            success: true,
            data: data[0],
            message: 'Successfully added to the list!'
        });

    } catch (error) {
        console.error('Saving error:', error);
        res.status(500).json({error: error.message});
    }
}