import Image from "next/image";
import { RecentlyPlayedTracks } from "@/types/types";
// Shows the recently played tracks of the user
export default function RecentlyPlayed({ track }: RecentlyPlayedTracks) {
    const tracks = track || []; // Access the `track` array safely

    console.log('Tracks:', tracks); // Debugging: Check the extracted tracks

    return Array.isArray(tracks) && tracks.length > 0 ? (
        <div className="tooltip tooltip-bottom text-left" data-tip="">
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <Image
                                    src={tracks[0].album.images[0].url}
                                    alt="Album Art"
                                    width={600}
                                    height={600}
                                    className="rounded-3xl shadow-xl opacity-90 mb-4"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="stat-title">Recently Played</div>
                    <div className="stat-value text-primary">{tracks[0].name}</div>
                    <div className="stat-desc">Artist: {tracks[0].artists[0].name}</div>
                </div>
            </div>
        </div>
    ) : (
        <div className="stats shadow">Nothing yet...</div>
    );
}