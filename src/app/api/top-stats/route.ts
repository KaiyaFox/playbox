import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {

    try {
        console.log("Getting user's top stats");
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const accessToken = session.accessToken;

        if (!accessToken) {
            return NextResponse.json({ error: "Access token not found" }, { status: 401 });
        }

        const getTopItemsUrl = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=2";

        const response = await fetch(getTopItemsUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error("Spotify API Error:", response.statusText);
            return NextResponse.json({ error: "Failed to fetch data from Spotify" }, { status: response.status });
        }

        const data = await response.json();

        if(!data.items || data.items === 0) {
            return NextResponse.json({ error: "No top artists found" }, { status: 404 });
        }

        const artist = data.items[0]

        // Write top artist to supabase
        const { error } = await supabase
            .from('users')
            .update({ top_artist: artist })
            .eq('email', session.user?.email);
        if (error) {
            console.error('Error updating top artist:', error);
            return NextResponse.json({ error: "Failed to update top artist" }, { status: 500 });
        }


        if (!data.items || data.items.length === 0) {
            return NextResponse.json({ error: "No top artists found" }, { status: 404 });
        }

        return NextResponse.json({ artist });

    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ error: "Failed to fetch top stats" }, { status: 500 });
    }

    // Ensure there's always a response
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
}
