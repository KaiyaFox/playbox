import Image from "next/image";
import { SpotifyTrack } from "@/types/types";


export default function RecentlyPlayed({ items }: { items: SpotifyTrack[] }) {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="bg-base-200 p-4 rounded-xl shadow-lg">
                <p className="text-gray-400">Nothing yet...</p>
            </div>
        );
    }

    return (
        <div className="bg-base-200 rounded-xl p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[1200px] overflow-y-auto pr-2">
                {items.map((track) => (
                    <div key={track.id} className="bg-gray-900 p-4 rounded-lg shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 flex-shrink-0">
                                <Image
                                    src={track.album.images[0].url}
                                    alt={`${track.name} Album Art`}
                                    width={64}
                                    height={64}
                                    className="rounded"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold">{track.name}</h3>
                                <p className="text-xs text-gray-400">
                                    {track.artists.map((a) => a.name).join(", ")}
                                </p>
                                <p className="text-xs text-gray-500">{track.album.name}</p>
                                <a
                                    href={track.external_urls?.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-green-400 hover:text-green-500 mt-1"
                                >
                                    Open in Spotify
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}