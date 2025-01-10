export default function Popularity() {
    const popularity = 80; // Example popularity value (0 - 100)
    const trend = 'Up';    // Trend indicator (e.g., 'Up', 'Down')

    // Calculate how many hearts to fill based on the popularity
    const filledHearts = Math.floor(popularity / 25); // 0 - 4 hearts
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

                <div className="stat-desc">{trend} more than last week</div>
            </div>
        </div>
    );
}
