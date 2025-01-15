import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// To save a note:
export const saveNote = async (note: string, rating: number, songId: string) => {
    const { data, error } = await supabase
        .from('songs')
        .insert([
            { note: note, rating: rating, songId: songId, created_at: new Date() },
        ]);
    if (error) {
        console.error('Error saving note:', error);
    } else {
        console.log('Note saved:', data);
    }
};