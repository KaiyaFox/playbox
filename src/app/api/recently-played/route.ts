import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { updateRecentlyPlayed } from "@/app/supabase/updateRecentlyPlayed";
import { SpotifyTrack } from "@/types/types";

export async function GET() {
    try {
        console.log("Calling Spotify...");

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const accessToken = session.accessToken;

        // Fetch recently played from Spotify
        const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=12`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ playing: false });
        }

        // Spotify API response shape: { items: [{ track: SpotifyTrack }] }
        const rawData = await response.json();

        // Flatten into just SpotifyTrack[]
        const tracks: SpotifyTrack[] = rawData.items.map(({ track }: { track: SpotifyTrack }) => ({
            id: track.id,
            name: track.name,
            popularity: track.popularity,
            artists: track.artists,
            album: track.album,
            external_urls: track.external_urls,
        }));

        console.log("Cleaned tracks:", tracks);

        // Save to Supabase
        await updateRecentlyPlayed(tracks, session.user.email!);

        return NextResponse.json({ tracks }); // Optional: return the flattened data
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ error: "Failed to fetch recently played" }, { status: 500 });
    }
}