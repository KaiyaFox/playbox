
export default function AboutPage() {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="p-6 rounded-lg shadow-lg w-96 list bg-base-300/30 rounded-box shadow-md backdrop-blur-sm">
                <h1 className="text-xl font-bold mb-4 text-center">About</h1>
                <p className=" mb-6 text-center">PlayBox is a small Spotify app that can shows granular information about your
                listening habits.</p>
                <p>Simply login using your spotify account to see realtime play data, recent plays, affinity stats and popularity metrics.</p>

                <p className=" text-center font-bold">How it works</p>
                <p className="mb-6 text-center">
                    When you login with your spotify account, the PlayBox app tracks your currently playing track on spotify.
                    PlayBox itself is not a playing the content from spotify so you can login to PlayBox on any device.
                    In addition, PlayBox shows other stats that give you insight to your Affinity towards artists, Recent plays, and popularity
                    You can also comment on any track that you are currently playing and any other PlayBox user who has commented on the
                    track shows up with that users Spotify username.
                </p>
            </div>
        </div>
    );
}