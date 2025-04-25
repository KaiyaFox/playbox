"use client";

import {useEffect} from "react";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AuthButton from "@/app/components/authButton";
import Popularity from "@/app/components/popular";
import RecentlyPlayed from "@/app/components/recentlyPlayed";
import Artist from "@/app/components/Artist";
import Comments from "@/app/components/comments";
import { addSongToDatabase } from "@/app/supabase/addSong";
import TopArtist from "@/app/components/TopArtist";
// import Concerts from "@/app/components/Concerts";


interface RecentlyPlayedItem {
    track: {
        name: string;
        album: {
            images: {
                url: string;
            }[];
        };
    };
    played_at: string;
    context: string | null;
}


interface TrackData {
    trackId?: string;
    track?: string;
    genre?: string;
    popularity?: string;
    artist?: string;
    artistId?: string;
    albumArt?: string;
    isPlaying?: boolean;
    recentlyPlayed?: RecentlyPlayedItem[];
}





export default function Dashboard() {
    const { data: session } = useSession();
    const [trackData,setTrackData] = useState<TrackData | null>(null);
    const [] = useState<Comment[]>([]);



    useEffect(() => {
        const fetchNowPlaying = async () => {
            if (!session) return;
            try {
                console.log("Fetching now now-playing track...");
                const response = await fetch("api/now-playing");
                if (response.ok) {
                    const data = await response.json();
                    await addSongToDatabase(data.trackId, data.track, data.artist, '-', data.albumArt);
                    console.log("DATA: ", data);
                    setTrackData({
                        trackId: data.trackId,
                        track: data.track,
                        genre: data.genre,
                        popularity: data.popular,
                        artist: data.artist,
                        artistId: data.artistId,
                        albumArt: data.albumArt,
                        isPlaying: data.isPlaying,
                        recentlyPlayed: data.recentlyPlayed,
                    });
                    if (!session) return;

                } else {
                    setTrackData(null);
                }
            } catch (error) {
                console.error("Error fetching now now-playing track:", error);
                setTrackData(null);
            }
        };

        fetchNowPlaying(); // Init
        const interval = setInterval(fetchNowPlaying, 15000); // Poll every 15 seconds
        return () => clearInterval(interval); // Cleanup
    }, [session]);

    // 🎨 Vanta Background Effect
    useEffect(() => {
        const loadScripts = async () => {
            const threeScript = document.createElement("script");
            threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
            threeScript.async = true;

            const vantaScript = document.createElement("script");
            vantaScript.src = "https://cdn.jsdelivr.net/gh/tengbao/vanta@latest/dist/vanta.dots.min.js";
            vantaScript.async = true;
            
            threeScript.onload = () => {
                document.body.appendChild(vantaScript);
            };

            vantaScript.onload = () => {
                // @ts-expect-error - VANTA is a global variable
                if (window.VANTA) {
                    // @ts-expect-error - VANTA is a global variable
                    window.VANTA.DOTS({
                        el: "#vanta-background",
                        mouseControls: true,
                        touchControls: true,
                        minHeight: 200.0,
                        minWidth: 500.0,
                        scale: 1.0,
                        color: 0x8b53ff,
                        backgroundColor: 0x181818,
                    });
                }
            };

            document.body.appendChild(threeScript);
        };

        loadScripts();
    }, []);


    // For now we useeffect to call the api to sync the recently played that will save to supabase
    useEffect(() => {
        console.log("TRACKDATA: ", trackData?.artist);

        const syncRecentlyPlayed = async () => {
            try {
                const res = await fetch("/api/recently-played");
                if (!res.ok) {
                    const error = await res.json();
                    console.error("Failed to sync recently played:", error);
                } else {
                    console.log("Recently played data synced successfully.", res);
                }
            } catch (err) {
                console.error("Error syncing recently played data:", err);
            }
        };

        if (session) {
            syncRecentlyPlayed();
        }
    }, [session, trackData]);


    return (
        <>
            {/* Background */}
            <div id="vanta-background" className="fixed inset-0 z-0 w-full h-full opacity-100" />

            <div
                id="vanta-background"
                className="fixed inset-0 z-0 w-full h-full opacity-100"
            />

            <div className="relative z-10 flex flex-col gap-6 px-6 pt-20 sm:pt-24 lg:pt-16 max-w-7xl mx-auto min-h-screen">



                {session ? (
                    <>
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow-lg text-white text-center mb-4">
                            <h2 className="text-3xl font-bold">{trackData?.track}</h2>
                            <p className="text-sm">{trackData?.artist}</p>
                        </div>

                        {/*Floating Player*/}
                        <div className="fixed bottom-4 right-4 bg-base-200 p-4 rounded-xl shadow-xl z-50">
                            <h3 className="font-semibold text-lg">{trackData?.track}</h3>
                            <p className="text-sm text-gray-400">{trackData?.artist}</p>
                        </div>



                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Left - Affinity & Comments */}
                        <div className="bg-base-200 rounded-xl p-4 shadow-lg flex flex-col gap-4">
                            <TopArtist />

                            {trackData && (
                                <Comments
                                    spotifySongId={trackData.trackId || ""}
                                    userId={session?.user?.email || ""}
                                    track={trackData.track || ""}
                                    onCommentsFetched={(comments) => console.log(comments)}
                                />
                            )}
                        </div>




                        {/* Middle - Now Playing */}
                        <div className="bg-base-200 rounded-xl p-4 shadow-lg flex flex-col items-center text-center">
                            {trackData ? (
                                <>
                                    {trackData.albumArt && (
                                        <Image
                                            src={trackData.albumArt}
                                            alt="Album Art"
                                            width={240}
                                            height={240}
                                            className="rounded-xl shadow-md opacity-90"
                                        />
                                    )}
                                    <div className="mt-3 mb-1">
                                        <h1 className="text-2xl font-bold text-purple-400">{trackData.track}</h1>
                                        <p className="text-gray-400 text-sm">{trackData.artist}</p>
                                    </div>
                                    <Popularity popularity={trackData.popularity} />
                                    <p className="text-white text-sm mt-2">
                                        {trackData.isPlaying ? "🔊" : "Spotify Paused"}
                                    </p>

                                    <div className="mt-4 w-full">
                                        <Artist artistId={trackData.artistId || ""} />
                                    </div>

                                </>
                            ) : (
                                <p className="text-sm text-gray-400">No track data. Play something on Spotify!</p>
                            )}
                        </div>

                        {/* Right - Recently Played */}
                        <div className="bg-base-200 rounded-xl p-4 shadow-lg">
                            <RecentlyPlayed recentlyPlayed={trackData?.recentlyPlayed || []} />
                        </div>
                    </div>
                        </>
                ) : (
                    <div className="hero min-h-screen relative z-10">
                        <div className="card w-full max-w-md bg-base-200 shadow-xl text-center p-8">
                            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                                Welcome to PlayBox 🎵
                            </h1>
                            <p className="py-4 text-lg text-gray-300">
                                Connect your Spotify account to unlock your personalized music experience.
                            </p>
                            <AuthButton />
                            <p className="italic text-sm mt-2 text-gray-400">🎧 Closed Beta</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );



}

