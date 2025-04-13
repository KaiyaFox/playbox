import { NextResponse} from "next/server";
import { getServerSession} from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { updateRecentlyPlayed } from "@/app/supabase/updateRecentlyPlayed";
import {SpotifyRecentlyPlayedResponse, SpotifyTrack} from "@/types/types";


export async function GET() {

    try {
        console.log("Calling spotify!!")
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthroized"}, { status: 401 });
        }

        const accessToken = session.accessToken;
        // console.log(accessToken)

        // Fetch
        const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=12`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // console.log("From spotify", response)

        // TODO: Handle if response is not 200. Why am i checking for 204?
        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({playing: false});
        }

        const data: SpotifyRecentlyPlayedResponse = await response.json();
        console.log("SPOTIFYRECENTPLAYED", data)

        const tracks: SpotifyTrack[] = data.items.map(({ track })=> ({
            id: track.id,
            name: track.name,
            popularity: track.popularity,
            artists: track.artists,
            album: track.album,
            external_urls: track.external_urls,
        }))

        // Update recently played in supabase
        await updateRecentlyPlayed(tracks, session.user.email || session.user.email!);

        return NextResponse.json({tracks});
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ error: "Failed to fetch now playing track" }, { status: 500 });
    }
}