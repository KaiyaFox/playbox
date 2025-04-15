
import Dashboard from "./components/Dashboard";
import Navbar from "@/app/components/navbar";

export const metadata = {
    title: "PlayBox - Share Your Spotify Listens",
    description: "See what you're listening to on Spotify in real-time!",
};

export default async function Home() {
        return (
            <main className="min-h-screen">

                <Navbar/>
                <div>
                  <Dashboard/>
                    <div className="flex-grow">
                    </div>
                </div>
            </main>
        );
    }

