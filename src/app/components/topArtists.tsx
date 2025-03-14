"use client";
import { useEffect} from "react";


export default function TopArtists() {
    useEffect(() => {
        // Fetch top artists from Redis
        fetch("/api/topArtists")
            .then((response) => response.json())
            .then((data) => {
                console.log("Top Art: ", data);
            });
    }, []);

    return (
        <>
            {/* Left Panel */}
            <div className="w-72 bg-neutral p-5 overflow-y-auto border-r border-gray-800">
                <h2 className="text-xl font-bold text-gray-200">Top Artists</h2>
                <p className="text-gray-400">Your favorite artists go here...</p>
            </div>
        </>
    );
}