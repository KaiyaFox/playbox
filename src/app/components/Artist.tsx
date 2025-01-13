"use client"

import { useState, useEffect } from "react";

// Define the structure of the data
interface ArtistData {
    artistId: string;
    artist: string;
    genre: string;
    popularity: string;
}

interface ArtistProps {
    artistId: string; // The artistId will be passed as a prop
}

export default function Artist({ artistId }: ArtistProps) {
    const [artistData, setArtistData] = useState<ArtistData | null>(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                console.log("Fetching artist...");

                const response = await fetch(`/api/artist?artistId=${artistId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("DATA: ", data);
                    setArtistData({
                        artistId: data.artistId,
                        artist: data.artist,
                        genre: data.genre,
                        popularity: data.popularity,
                    });
                } else {
                    console.error("Failed to fetch artist data");
                }
            } catch (error) {
                console.error("Error fetching artist data:", error);
            }
        };

        if (artistId) {
            fetchArtist();
        }
    }, [artistId]); // Dependency array ensures the effect runs when artistId changes

    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Style</div>
                <div className="stat-value">
                    {artistData?.genre ? String(artistData.genre).toUpperCase() : "No genre available"}
                </div>


                <div className="rating gap-3">

                </div>

                <div className="stat-desc"></div>
            </div>
        </div>
    );
}
