import NowPlaying from "../app/components/nowPlaying";
import Navbar from "@/app/components/navbar";
export const metadata = {
    title: "PlayBox - Share Your Spotify Listens",
    description: "See what you're listening to on Spotify in real-time!",
};

export default function Home() {
        return (
            <main className="min-h-screen">
                <Navbar/>
                <div>
                  <NowPlaying/>
                    <div className="flex-grow">
                    </div>
                </div>

            </main>
        );
    }

