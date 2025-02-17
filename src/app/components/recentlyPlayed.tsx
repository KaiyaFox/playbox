import Image from "next/image";

interface RecentlyPlayedItem {
    track: {
        name: string;
        album: {
            images: { url: string } [];
        };

    };
    played_at: string;
    context: string | null;
}

interface RecentlyPlayedProps {
    recentlyPlayed: RecentlyPlayedItem[];
}

export default function RecentlyPlayed({recentlyPlayed}: RecentlyPlayedProps) {
    // Check if data ready
    if (!recentlyPlayed || recentlyPlayed.length === 0) {
        return (
            <div>
                Recently played tracks arent available 😔
            </div>
        )
    }
    return (
        <div>
            <ul className="list bg-base-300/30 rounded-box shadow-md backdrop-blur-sm">
                <li className="p-4 pb-2 text-sm opacity-60 tracking-wide">Your Recently Played</li>
                {recentlyPlayed.map((item, index) => (
                    <li key={index} className="list-row">
                        <div className="text-4xl font-thin opacity-30 tabular-nums text-right">{index + 1}</div>
                        <div>
                            <Image
                                className="size-20 rounded-box"
                                width={100}
                                height={100}
                                src={item.track.album.images[0].url}
                                alt="Album Art"

                            />
                        </div>
                        <div className="list-col-grow">
                            <div>{item.track.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{item.played_at}</div>
                            <div className="divider opacity-70"></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}