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
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-sm opacity-60 tracking-wide">Recently Played</li>
                {recentlyPlayed.map((item, index) => (
                    <li key={index} className="list-row">
                        <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                        <div>
                            <img className="size-20 rounded-box" src={item.track.album.images[0].url} alt="Album Art"/>

                        </div>
                        <div className="list-col-grow">
                            <div>{item.track.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{item.played_at}</div>
                        </div>
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none"
                                   stroke="currentColor">
                                    <path d="M6 3L20 12 6 21 6 3z"></path>
                                </g>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}