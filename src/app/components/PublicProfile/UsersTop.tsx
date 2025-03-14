import Image from "next/image";

interface StatsProps {
    id: string;
    name: string;
    uri?: string;
    genres?: string[];
    followers?: string;
    images: string;
    popularity?: string;
    external_urls?: {spotify: string;}

}

export default function UsersTopArtist(stats: StatsProps) {



    return stats ? (
        <>
            <div className="tooltip tooltip-bottom text-left"
                 data-tip="">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <Image
                                        src={stats.images || ''}
                                        alt="Album Art"
                                        width={600}
                                        height={600}
                                        className="rounded-3xl shadow-xl opacity-90 mb-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="stat-title">#1 Artist streamed</div>
                        <div className="stat-value text-primary">{stats?.name || "Not Available"}</div>
                        <div className="stat-desc">Genre: {stats?.genres ? stats.genres.join(", ") : "Not Available"}</div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div className="stats shadow">
            Nothing yet...
        </div>
    )
}