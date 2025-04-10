// Updates user's recently played songs in Supabase
import { supabase } from "@/lib/supabaseClient";

export async function updateRecentlyPlayed(recentlyPlayed: string[], userId: string | null | undefined) {
    if (!recentlyPlayed) {
        console.log('No recently played provided. Database call skipped.');
        return;
    }
    console.log('Changing recently played to:', recentlyPlayed);
    const { data, error } = await supabase
        .from('users')
        .update({ recently_played: recentlyPlayed })
        .eq('email', userId);

    if (error) {
        console.error('Error changing recently played:', error);
    }
    return data;
}