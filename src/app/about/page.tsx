export default function AboutPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-100 px-4">
            <div className="bg-base-200/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full space-y-8 border border-base-300">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-primary">About PlayBox</h1>
                    <p className="text-gray-400">
                        Music is more than entertainment — it reflects your mood, style, fashion, and even your personality.
                        <br />
                        <span className="text-secondary font-semibold">PlayBox</span> blends your unique musical taste into a vibrant social platform that tracks and visualizes your listening habits.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-primary">What PlayBox Does</h2>
                    <p className="text-gray-400 text-center">
                        PlayBox uses your Spotify account to show detailed, real-time data about your musical journey.
                        From your current plays to affinity stats and popularity metrics — you’ll see your tastes in a whole new light.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-primary">How It Works</h2>
                    <p className="text-gray-400 text-center">
                        Simply log in with your Spotify account. PlayBox tracks what you&#39;re playing — without actually playing content itself.
                        <br />
                        This means you can stay logged into PlayBox on any device without interrupting your music.
                    </p>
                    <p className="text-gray-400 text-center">
                        Get insights like your artist affinity, recent plays, and song popularity. Plus, you can leave comments on tracks you&#39;re listening to and see comments from other PlayBox users — linked directly to their Spotify usernames.
                    </p>
                </div>

                <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 italic">Built for music lovers, by music lovers 🎶</p>
                </div>
            </div>
        </div>
    );
}