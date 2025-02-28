// Helps get data from users table from Supabase
import { supabase } from "@/lib/supabaseClient";

export async function getUserData(userId: string | undefined) {
    const { data, error } = await supabase
        .from('users')
        .select('id, name, email, handle, playlist')
        .eq('email', userId);

    if (error) {
        console.error('Error fetching user data:', error);
    }
    return data;
}