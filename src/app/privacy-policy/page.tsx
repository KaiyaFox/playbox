import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-100 px-4">
            <div className="bg-base-200/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full space-y-8 border border-base-300">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-primary">Privacy Policy</h1>
                    <p className="text-gray-400 text-sm">Effective Date: April 15, 2025</p>
                </div>

                <div className="space-y-4 text-gray-400 text-sm">
                    <p>
                        At <span className="text-primary font-bold">PlayBox</span>, we respect your privacy and are committed to protecting your personal data.
                        This policy explains what we collect, how we use it, and your rights.
                    </p>

                    <section className="space-y-2">
                        <h2 className="text-xl font-bold text-primary">What We Collect</h2>
                        <ul className="list-disc list-inside pl-2 space-y-1">
                            <li>Your Spotify user ID and display name</li>
                            <li>Your email address (for account management)</li>
                            <li>Your recently played tracks and top artists</li>
                            <li>What you&#39;re currently listening to</li>
                        </ul>
                        <p>We do not link individual tracks to specific users. No third-party tracking or marketing tools are used.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-bold text-primary">How We Use It</h2>
                        <p>
                            Your data is only used to personalize your PlayBox experience — such as showing your top artists
                            and tracking your listening session. All processing happens securely on our servers, following Spotify’s API policies.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-bold text-primary">Account & Data Deletion</h2>
                        <p>
                            You can delete your PlayBox account at any time, and all associated data will be permanently removed.
                        </p>
                        <p>
                            <Link href="/delete" className="text-blue-400 hover:underline">
                                Delete My Account →
                            </Link>
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-bold text-primary">Spotify Disconnection</h2>
                        <p>
                            You can also disconnect PlayBox from your Spotify account by visiting the{" "}
                            <a
                                href="https://www.spotify.com/account/apps/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Spotify Apps Dashboard →
                            </a>
                            . Once disconnected, we will automatically remove your Spotify-related data.
                        </p>
                    </section>
                </div>

                <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 italic">We believe in transparency and respect. ✨</p>
                </div>
            </div>
        </div>
    );
}