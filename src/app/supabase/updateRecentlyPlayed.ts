import { supabase } from "@/lib/supabaseClient";
import { SpotifyTrack } from "@/types/types";

export async function updateRecentlyPlayed(tracks: SpotifyTrack[], email: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .update({ recently_played: tracks  }) // matches RecentlyPlayedTracks type
            .eq("email", email);

        if (error) {
            console.error("Error updating recently played tracks:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error updating recently played tracks:", error);
        throw error;
    }
}