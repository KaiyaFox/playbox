"use client";

import {useEffect, useRef} from "react";
import { useState } from "react";
import Image from "next/image";
import AuthButton from "@/app/components/authButton";
import TopArtists from "@/app/components/topArtists";
import Popularity from "@/app/components/popular";



interface TrackData {
    trackId?: string;
    track?: string;
    popularity?: string;
    artist?: string;
    albumArt?: string;
    isPlaying?: boolean;
}



export default function NowPlaying() {
    const [trackData,setTrackData] = useState<TrackData | null>(null);
    const previousTrackId = useRef<string | null>(null);


    useEffect(() => {
        // Fetch the current track
        const fetchNowPlaying = async () => {
            try {
                console.log("Fetching now now-playing track...");
                const response = await fetch("api/now-playing");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setTrackData({
                        trackId: data.trackId,
                        track: data.track,
                        popularity: data.popular,
                        artist: data.artist,
                        albumArt: data.albumArt,
                        isPlaying: data.isPlaying,
                    });
                } else {
                    setTrackData(null);
                }
            } catch (error) {
                console.error("Error fetching now now-playing track:", error);
                setTrackData(null);
            }
            // const data: TrackData = await response.json();

            // // Only update if track id changes
            // if (data.trackId !== previousTrackId.current) {
            //     previousTrackId.current = data.trackId;
            //     setTrackData(data)
            // }
        };

        fetchNowPlaying(); // Init
        const interval = setInterval(fetchNowPlaying, 15000); // Poll every 15 seconds
        return () => clearInterval(interval); // Cleanup
    },
    []);

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
                if (window.VANTA) {
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
        <div className="relative flex h-screen">
            {/* Vanta Background */}
            <div id="vanta-background" className="absolute inset-0 -z-0 opacity-100" />

            {/* Right Panel */}
            <div className=" relative z-1 flex flex-col flex-grow items-center justify-center">

                {trackData ? (

                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-purple-400 mb-1">Now Bumpin'</h1>

                        <div className="bg-gray-800 bg-opacity-0 p-5 rounded-xl shadow-lg mb-1">
                            <p className="text-3xl text-white font-semibold">{trackData.track}</p>
                            <p className="text-lg text-gray-400">{trackData.artist}</p>
                            <p className="mt-2 text-2xl">{trackData.isPlaying ? "🔊" : "🔇"}</p>
                        </div>

                        {trackData.albumArt && (
                            <Image
                                src={trackData.albumArt}
                                alt="Album Art"
                                width={600}
                                height={600}
                                className="rounded-3xl shadow-xl opacity-90 mb-2"
                            />
                        )}
                        <div className="mr-1">
                            <Popularity popularity={trackData.popularity} />
                        </div>

                    </div>

                ) : (
                    <AuthButton/>
                )}
            </div>
        </div>
        </>

    );
}

