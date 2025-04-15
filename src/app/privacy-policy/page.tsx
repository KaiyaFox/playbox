import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 rounded-lg shadow-lg w-96 bg-base-300/30 rounded-box shadow-md backdrop-blur-sm">
                    <h1 className="text-xl font-bold mb-4 text-center">Privacy Policy</h1>
                    <p className="mb-6 text-center">Effective Date: April 15, 2025</p>

                    <p className="mb-4 text-sm">
                        At <strong>PlayBox</strong>, we respect your privacy and are committed to protecting your data.
                        This policy explains what we collect, how we use it, and your rights.
                    </p>

                    <h2 className="font-semibold mt-4 mb-2 text-sm">What We Collect</h2>
                    <p className="mb-4 text-sm">
                        When you connect your Spotify account to PlayBox, we collect:
                        <ul className="list-disc pl-5">
                            <li>Your Spotify user ID and display name</li>
                            <li>Your email address (for account management)</li>
                            <li>Your recently played tracks and top artists</li>
                            <li>What you're currently listening to</li>
                        </ul>
                        We do not link individual tracks to specific users. No third-party tracking or marketing tools are used.
                    </p>

                    <h2 className="font-semibold mt-4 mb-2 text-sm">How We Use It</h2>
                    <p className="mb-4 text-sm">
                        Your data is used only to personalize your PlayBox experience — for example, to display your top artists
                        or track your current listening session. All processing is done securely on our servers and follows Spotify’s API policies.
                    </p>

                    <h2 className="font-semibold mt-4 mb-2 text-sm">Account & Data Deletion</h2>
                    <p className="mb-4 text-sm">
                        You may delete your PlayBox account at any time, and all associated data will be permanently removed.
                        <br />
                        <Link href="/delete" className="text-blue-400 hover:underline">Delete My Account</Link>
                    </p>

                    <h2 className="font-semibold mt-4 mb-2 text-sm">Spotify Disconnection</h2>
                    <p className="mb-4 text-sm">
                        You can also disconnect PlayBox via your{" "}
                        <a href="https://www.spotify.com/account/apps/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            Spotify Apps Dashboard
                        </a>. When disconnected, we will automatically remove your Spotify-related data.
                    </p>
                </div>
            </div>
        </>
    );
}