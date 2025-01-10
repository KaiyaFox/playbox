import NowPlaying from "../app/components/nowPlaying";
import TopArtists from "@/app/components/topArtists";
import Navbar from "@/app/components/navbar";
import Popularity from "@/app/components/popular";
export const metadata = {
    title: "PlayBox - Share Your Spotify Listens",
    description: "See what you're listening to on Spotify in real-time!",
};

export default function Home() {
        return (
            <main>
                <Navbar/>
                <div>

                    <NowPlaying/>
                    <div className="flex justify-center">
                    </div>
                </div>

            </main>
        );
    }

