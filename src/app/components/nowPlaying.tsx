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





export default function NowPlaying() {
    const { data: session } = useSession();
    const [trackData,setTrackData] = useState<TrackData | null>(null);
    const [] = useState<Comment[]>([]);



    useEffect(() => {
        const fetchNowPlaying = async () => {
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
    }, []);

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

    return (
        <>
            <div className="relative flex items-center justify-center min-h-[calc(100vh-1rem)] px-4 pt-20 sm:pt-24">
                {/* Vanta Background */}
                <div id="vanta-background" className="fixed inset-0 z-0 w-full h-full opacity-100" />

                {/* Main Content */}
                <div className="absolute z-10 flex">
                    {trackData ? (
                        <div className="flex flex-col lg:flex-row w-full gap-4">
                            {/* Left Most Played */}
                            <div className="flex-grow grid place-items-center p-4 text-left">
                                <h1 className="text-4xl sm:text-5xl font-bold text-purple-400 mb-3 text-center">
                                    <Comments
                                        spotifySongId={trackData.trackId || ''}
                                        userId={session?.user?.email || ''}
                                        track={trackData.track || ''}
                                        onCommentsFetched={(comments) => console.log(comments)}

                                    />
                                </h1>
                            </div>



                            {/* Center Track Data */}
                            <div className="flex-grow grid place-items-center">

                                <div className="text-center">
                                    <TopArtist/>
                                    <p className="divider"/>

                                    <h1 className="text-4xl sm:text-5xl font-bold text-purple-400 mb-3">
                                    </h1>

                                    <div className="p-5 rounded-xl mb-4">
                                        <p className="text-2xl sm:text-3xl text-white font-semibold">
                                            {trackData.track}
                                        </p>
                                        <p className="mt-2 text-2xl">{trackData.isPlaying ? "🔊" : "Spotify Paused. Play something on spotify."}</p>
                                        <p className="text-lg text-gray-400">{trackData.artist}</p>
                                        <p>{trackData.genre}</p>
                                        <Popularity popularity={trackData.popularity}/>


                                    </div>
                                    <div className="items-center justify-center text-center text-2xl">
                                        <Artist artistId={trackData.artistId || ''}/>
                                    </div>

                                    {trackData.albumArt && (
                                        <Image
                                            src={trackData.albumArt}
                                            alt="Album Art"
                                            width={600}
                                            height={600}
                                            className="rounded-3xl shadow-xl opacity-90 mb-4"
                                        />
                                    )}
                                </div>

                            </div>

                            {/* Right Most Played */}
                            <div className="flex-grow grid place-items-center p-4">
                                <RecentlyPlayed recentlyPlayed={trackData.recentlyPlayed || []} />

                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                                Welcome to PlayBox!
                            </h1>
                            <p className="text-lg sm:text-2xl text-gray-300 mt-2">
                                Connect your Spotify account to get started.
                            </p>
                            <div className="mt-4">
                                <AuthButton />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );



}

