import Image from "next/image";
import { SpotifyTrack } from "@/types/types";

// Shows the recently played tracks of the user
export default function RecentlyPlayed({ items }: { items: { items: SpotifyTrack[] } }) {
    const tracks = items.items;
    console.log(tracks);
    if (!Array.isArray(tracks) || tracks.length === 0) {
        return <div className="stats shadow">Nothing yet...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => (
                <div key={track.id} className="card bg-gray-900 shadow-lg p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="w-16 h-16 mr-4">
                            <Image
                                src={track.album.images[0].url}
                                alt={`${track.name} Album Art`}
                                width={64}
                                height={64}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{track.name}</h3>
                            <p className="text-sm text-gray-400">
                                {track.artists.map(artist => artist.name).join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}