import { supabase } from "@/lib/supabaseClient";

export async function updatePlaylist(playlistId: string, userId: string | null | undefined) {
    if (!playlistId) {
        console.log('No playlist provided. Database call skipped.');
        return;
    }
    console.log('Changing playlist to:', playlistId);
    const { data, error } = await supabase
        .from('users')
        .update({ playlist: playlistId })
        .eq('email', userId);

    if (error) {
        console.error('Error changing playlist:', error);
    }
    return data;
}

