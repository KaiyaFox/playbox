// Helps get data from users table from Supabase
import { supabase } from "@/lib/supabaseClient";

export async function getUserData(userId: string | undefined) {
    const { data, error } = await supabase
        .from('users')
        .select('id, name, email, handle, playlist, public')
        .eq('email', userId);

    if (error) {
        console.error('Error fetching user data:', error);
    }
    return data;
}

export async function updateUserProfile(userId: string | undefined, name: string, handle: string, playlist: string, profilePublic: boolean) {
    const { data, error } = await supabase
        .from('users')
        .update({ name: name, handle: handle, playlist: playlist, public: profilePublic })
        .eq('email', userId);

    if (error) {
        console.error('Error updating user data:', error);
    }
    return data;
}