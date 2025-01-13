import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const artistId = searchParams.get("artistId");
        console.log("Artist ID:", artistId);

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const accessToken = session.accessToken;
        console.log(accessToken);

        // Fetch data from Spotify API
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log("Artist response:", response);

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ playing: false });
        }

        const data = await response.json();
        console.log("Artist data:", data);

        const artist = {
            artistId: data.id,
            artist: data.name,
            genre: data.genres,
            popularity: data.popularity,
            followers: data.followers.total,
        };

        return NextResponse.json(artist);
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
    }
}
