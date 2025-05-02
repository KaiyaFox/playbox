import {HandPickedTrack} from "@/types/types";
import {useEffect, useState} from "react";

interface HandPickedTracksProps {
    tracks: HandPickedTrack[];
}

// Users can pick tracks to showcase on their profile. This component displays those tracks.
export default function HandPickedTracks({tracks}: HandPickedTracksProps) {
    const [handPickedTracks, setHandPickedTracks] = useState<HandPickedTrack[]>([]);

    useEffect(() => {
        if (tracks) {
            setHandPickedTracks(tracks);
        }
    }, [tracks]);

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {handPickedTracks.map((track) => (
                <div
                    key={track.id}
                    className="cursor-pointer flex items-center gap-4 p-4 rounded-xl  hover:shadow-md transition-all duration-200"
                >
                    <img
                        src={track.image}
                        alt={track.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{track.name}</p>
                        <p className="text-sm text-gray-500">
                            {track.artists.map((artist) => artist.name).join(", ")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}