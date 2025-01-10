import { NextResponse} from "next/server";
import { getServerSession} from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET() {
    try {
        console.log("Calling spotify")
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({error: "Unauthroized"}, { status: 401 });
        }

        const accessToken = session.accessToken;
        console.log(accessToken)

        // Fetch
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
        });

        console.log(response)

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({playing: false});
        }

        const data = await response.json();
        console.log(data)

        const track = {
            trackId: data.item.id,
            track: data.item.name,
            popular: data.item.popularity,
            artist: data.item.artists.map((artist: any) => artist.name).join(", "),
            albumArt: data.item.album.images[0].url,
            isPlaying: data.is_playing,
        }
        return NextResponse.json(track);
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ error: "Failed to fetch now playing track" }, { status: 500 });
    }
}