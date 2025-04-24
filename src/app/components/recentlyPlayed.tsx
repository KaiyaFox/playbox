import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface RecentlyPlayedItem {
    track: {
        name: string;
        artists?: { name: string }[];
        album: {
            images: { url: string }[];
        };
    };
    played_at: string;
    context: string | null;
}

interface RecentlyPlayedProps {
    recentlyPlayed: RecentlyPlayedItem[];
}

export default function RecentlyPlayed({ recentlyPlayed }: RecentlyPlayedProps) {
    if (!recentlyPlayed || recentlyPlayed.length === 0) {
        return <div>Recently played tracks aren&#39;t available 😔</div>;
    }

    return (
        <div>
            <h2 className="text-sm opacity-60 tracking-wide mb-2">Your Recently Played</h2>
            <ul className="space-y-4">
                {recentlyPlayed.map((item, index) => {
                    const artistNames = item.track.artists?.map(a => a.name).join(", ");
                    const playedAgo = formatDistanceToNow(new Date(item.played_at), { addSuffix: true });

                    return (
                        <li
                            key={index}
                            className="flex items-center gap-4 bg-base-300/30 rounded-xl p-3 shadow-sm hover:bg-base-200 transition-all"
                        >
                            <Image
                                className="rounded-md shadow-md"
                                width={64}
                                height={64}
                                src={item.track.album.images[0]?.url}
                                alt="Album Art"
                            />
                            <div className="flex flex-col overflow-hidden">
                                <div className="text-sm font-semibold truncate">{item.track.name}</div>
                                <div className="text-xs text-gray-400 truncate">{artistNames}</div>
                                <div className="text-xs text-gray-500">{playedAgo}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}