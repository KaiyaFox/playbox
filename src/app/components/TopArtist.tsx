import {useEffect, useState} from "react";
import Image from "next/image";

interface StatsProps {
    title: string;
    followers: string;
    topAffinity: string;
    affinityImage: string;

}

export default function TopArtist() {
    const [stats, setStats] = useState<StatsProps | null>(null);


    // Make call to get data
    useEffect(() => {
        const fetchStats = async() => {
            try{
                const response = await fetch("/api/top-stats");
                const data = await response.json();
                console.log(data);
                setStats({
                    title: data.title,
                    followers: data.artist.followers.total,
                    topAffinity: data.artist.name,
                    affinityImage: data.artist.images[0].url
                })



            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        }
        fetchStats();
    }, []);
    return stats ? (
        <>
            <div className="tooltip tooltip-bottom text-left w-full max-w-md mx-auto"
                 data-tip="Your affinity artist is the top artist you interact with on Spotify. PlayBox updates this periodically and this can change from week to week depending on your listening activity">
                <div className="stats shadow w-full">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <div className="avatar">
                                <div className="w-17 rounded-full">
                                    <Image
                                        src={stats?.affinityImage || ''}
                                        alt="Album Art"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="stat-title">Your Affinity</div>
                        <div className="stat-value text-primary break-words">
                            {stats?.topAffinity || "Not Available"}
                        </div>
                        <div className="stat-desc text-sm break-words whitespace-normal w-full max-w-full leading-tight">
                            You and {Number(stats?.followers).toLocaleString() || "N/A"} others vibe with this artist
                        </div>
                    </div>
                </div>
            </div>
            </>
            ) : (
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">Your Affinity</div>
                    <div className="stat-value">Not Available</div>
                    <div className="stat-desc">Not Available</div>
                </div>
            </div>
            )
            }