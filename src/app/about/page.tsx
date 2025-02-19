import Link from "next/link";

export default function AboutPage() {
    return (

        <>
            <div className="flex items-center justify-center min-h-screen ">
                <div
                    className="p-6 rounded-lg shadow-lg w-96 list bg-base-300/30 rounded-box shadow-md backdrop-blur-sm">
                    <h1 className="text-xl font-bold mb-4 text-center">About</h1>
                    <p className=" mb-6 text-center">PlayBox is a small Spotify app that can shows granular information
                        about your
                        listening habits.</p>
                    <p>Simply login using your spotify account to see realtime play data, recent plays, affinity stats
                        and popularity metrics.</p>

                    <p className=" text-center font-bold">How it works</p>
                    <p className="mb-6 text-center">
                        When you login with your spotify account, the PlayBox app tracks your currently playing track on
                        spotify.
                        PlayBox itself is not a playing the content from spotify so you can login to PlayBox on any
                        device.
                        In addition, PlayBox shows other stats that give you insight to your Affinity towards artists,
                        Recent plays, and popularity
                        You can also comment on any track that you are currently playing and any other PlayBox user who
                        has commented on the
                        track shows up with that users Spotify username.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center min-h-screen ">
                <div
                    className="p-6 rounded-lg shadow-lg w-96 list bg-base-300/30 rounded-box shadow-md backdrop-blur-sm">
                    <h1 className="text-xl font-bold mb-4 text-center">Privacy Policy</h1>
                    <p className=" mb-6 text-center">How we use your data</p>
                    <p className="mb-6 text-center">
                        When you connect PlayBox Spotify Extension, we collect data that is only associated with your spotify account.
                        This data is used to show you your listening habits and is not shared with any third party. PlayBox servers store and
                        process your data for the purpose of showing you your listening habits and for providing you with a better user experience.
                        For example: When logged into PlayBox, the app will track and update what you are currently listenening to on Spotify.
                        The app will also store the tracks you listen on our database but no correlation is made between the track and the user.
                        The data that we use will consists of your spotify username, your spotify user id, your recently played tracks, your top affinity artist,
                        as well as your email address for account creation on our servers. We abide by Spotifys API policies and only use available data points that Spotify provides.

                        At any time you can delete your PlayBox account and all associated data will be deleted.
                        <Link href="/delete">Delete Account</Link>

                    </p>
                </div>
            </div>
        </>
    );
}