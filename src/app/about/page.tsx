
export default function AboutPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-purple-900 p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-xl font-bold mb-4 text-center">About</h1>
                <p className=" mb-6 text-center">PlayBox is a small Spotify app that can shows grainular information about your
                listening habits.</p>
                <p>Simply login using your spotify account to see realtime play data, recent plays, affinity stats and popularity metrics.</p>
            </div>
        </div>
    );
}