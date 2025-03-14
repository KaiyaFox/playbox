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
            <div className="tooltip tooltip-bottom text-left"
                 data-tip="Your affinity artist is the top artist you interact with on Spotify. PlayBox updates this
                 periodically and this can change from week to week depending on your listening activity">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <Image
                                        src={stats?.affinityImage || ''}
                                        alt="Album Art"
                                        width={600}
                                        height={600}
                                        className="rounded-3xl shadow-xl opacity-90 mb-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="stat-title">Your Affinity</div>
                        <div className="stat-value text-primary">{stats?.topAffinity || "Not Available"}</div>
                        <div className="stat-desc">You and {Number(stats?.followers).toLocaleString() || "N/A"} others vibe with
                            this
                            artist
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