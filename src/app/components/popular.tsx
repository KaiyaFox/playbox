'use client';
import {useEffect} from "react";


interface PopularityProps {
    popularity?: string | undefined

}

export default function Popularity({popularity}: PopularityProps) {

    // Get the popularity and trend data from the API
    useEffect(() => {
        fetch("/api/now-playing")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);


    // Calculate how many hearts to fill based on the popularity
    const filledHearts = Math.floor((Number(popularity) || 0) / 25); // 0 - 4 heartspopularity / 25); // 0 - 4 hearts
    const totalHearts = 4; // Max hearts

    // Create a simple array to represent the hearts, filled or not
    const hearts = [];
    for (let i = 0; i < totalHearts; i++) {
        hearts.push(i < filledHearts ? 'filled' : 'empty');
    }

    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Track Popularity</div>
                <div className="stat-value">{popularity}</div>

                <div className="rating gap-3">
                    {/* Loop through hearts array and display accordingly */}
                    {hearts.map((heart, index) => (
                        <input
                            key={index}
                            type="radio"
                            className={`mask mask-heart ${heart === 'filled' ? 'bg-red-400' : 'bg-gray-300'}`}
                            disabled
                        />
                    ))}
                </div>

                <div className="stat-desc"></div>
            </div>
        </div>
    );
}
