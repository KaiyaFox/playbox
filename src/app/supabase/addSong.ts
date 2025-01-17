import { createClient} from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

// Add a song if not already in the database. We pass in the spotify ID to check if the song is already in the database.
export async function addSongToDatabase(spotifyId: string, name: string, artist: string, album: string, image: string) {
    console.log('Adding song to database:', name, artist, album, image);
    if (!spotifyId) {
        console.error('No Spotify ID provided');
        return;
    }
    const { data, error } = await supabase
        .from('songs')
        .upsert([
            {
                spotify_id: spotifyId,
                name: name,
                artist: artist,
                album: album,
                image: image,
            }
        ], { onConflict: ['spotify_id'] });

    if (error) {
        console.error('Error adding song:', error);
    }
    return data;
}

// Add a comment for a specific song
export async function addCommentToSong(userId: string, songId: string, comment: string) {
    console.log("USER ID: ", userId);
    const { data, error } = await supabase
        .from('comments')
        .insert([
            {
                comment: comment,
                song_id: songId,
                user_id: userId },
        ]);

    if (error) {
        console.error('Error adding comment:', error);
    }
    return data;
}

// Fetch all comments for a specific song
export async function getCommentsForSong(songId: string) {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('song_id', songId);


    if (error) {
        console.error('Error fetching comments:', error);
    }
    return data;
}

