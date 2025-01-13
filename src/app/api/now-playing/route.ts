import { NextResponse} from "next/server";
import { getServerSession} from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface Artist {
    name: string
}

export async function GET() {

    try {
        console.log("Calling spotify")
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthroized"}, { status: 401 });
        }

        const urls = [
            "https://api.spotify.com/v1/me/player/currently-playing",
            "https://api.spotify.com/v1/me/player/recently-played?limit=5",
        ];

        const accessToken = session.accessToken
        console.log(accessToken)

        // Make multiple requests concurrently
        const response = await Promise.all(
            urls.map(url =>
                fetch(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            )
        );

        console.log("DATA FROM SPOTIFY: ", response)

        // Check for errors in the responses
        if (response.some(response => response.status === 204 || response.status > 400)) {
            return NextResponse.json({ playing: false });
        }

        // Process the responses
        const [currentlyPlayingData, topArtistsData] = await Promise.all(response.map(response => response.json()));
        console.log(currentlyPlayingData, topArtistsData);

        // We will use track to store the data we need even if it is not currently playing
        const track = {
            trackId: currentlyPlayingData.item.id,
            track: currentlyPlayingData.item.name,
            popular: currentlyPlayingData.item.popularity,
            artist: currentlyPlayingData.item.artists.map((artist: Artist) => artist.name).join(", "),
            albumArt: currentlyPlayingData.item.album.images[0].url,
            genre: currentlyPlayingData.item.genre,
            isPlaying: currentlyPlayingData.is_playing,
            recentlyPlayed: topArtistsData.items,
        };
        return NextResponse.json(track);
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ error: "Failed to fetch now playing track" }, { status: 500 });
    }
}