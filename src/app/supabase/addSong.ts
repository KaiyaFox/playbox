import { supabase } from "@/lib/supabaseClient";
import AlertMessage from "@/app/components/AlertMessage";

// Add a song if not already in the database. We pass in the spotify ID to check if the song is already in the database.
export async function addSongToDatabase(spotifyId: string, name: string, artist: string, album: string, image: string) {
    if (!spotifyId) {
        console.log('No Spotify song ID provided. Database call skipped.');
        return;
    }
    console.log('Adding song to database:', name, artist, album, image);
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
        ], { onConflict: 'spotify_id' });

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
        AlertMessage({message: "Failed to add comment. Please try again later."});
    }
    return data;
}

// Fetch all comments for a specific song
export async function getCommentsForSong(songId: string) {
    const { data, error } = await supabase
        .from('comments')
        .select('id, song_id, comment, created_at, user_id, users!user_id (name)')
        .eq('song_id', songId);


    if (error) {
        console.error('Error fetching comments:', error);
    }
    return data;
}

export async function updateHandle(handle: string, userId: string | null | undefined) {
    if (!handle) {
        console.log('No handle provided. Database call skipped.');
        return;
    }
    console.log('Changing handle to:', handle);
    const { data, error } = await supabase
        .from('users')
        .update({ handle: handle })
        .eq('email', userId);

    if (error) {
        console.error('Error changing handle:', error);
    }
    return data;
}

