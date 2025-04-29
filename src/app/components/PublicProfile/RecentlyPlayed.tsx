import Image from "next/image";
import { SpotifyTrack } from "@/types/types";
import { FaFire } from "react-icons/fa";

export default function RecentlyPlayed({ items }: { items: SpotifyTrack[] }) {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className="bg-base-200 p-4 rounded-xl shadow-lg">
                <p className="text-gray-400">Nothing yet...</p>
            </div>
        );
    }

    const allSameAlbum = items.every(
        (track) => track.album.name === items[0].album.name
    );

    return (
        <div
            className={`rounded-xl text-c p-4 shadow-lg bg-base-200 relative overflow-hidden ${
                allSameAlbum ? "album-streak-glow" : ""
            }`}
        >
            <div className="flex items-center gap-2 mb-4">

                {allSameAlbum && (
                    <div className="flex items-center gap-1 text-rose-500 animate-pulse">
                        <FaFire className="text-2xl" />
                        <span className="text-sm font-semibold">Listening Streak!</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[1200px] overflow-y-auto pr-2">
                {items.map((track) => (
                    <div key={track.id} className="bg-gray-900 p-4 rounded-lg shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 flex-shrink-0">
                                {track.album.images?.[0]?.url ? (
                                    <Image
                                        src={track.album.images[0].url}
                                        alt={`${track.name} Album Art`}
                                        width={64}
                                        height={64}
                                        className="rounded"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-700 rounded" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold">{track.name}</h3>
                                <p className="text-xs text-gray-400">
                                    {track.artists.map((a) => a.name).join(", ")}
                                </p>
                                <p className="text-xs text-gray-500">{track.album.name}</p>
                                {track.external_urls?.spotify && (
                                    <a
                                        href={track.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-xs text-green-400 hover:text-green-500 mt-1"
                                    >
                                        Play in Spotify ▶️
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}