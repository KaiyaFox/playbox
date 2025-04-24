"use client";
import { getTopArtist } from "@/app/supabase/addSong";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import Image from "next/image";
import PlayList from "@/app/components/PlayList";
import UsersTopArtist from "@/app/components/PublicProfile/UsersTop";
import RecentlyPlayed from "@/app/components/PublicProfile/RecentlyPlayed";
import {SpotifyTrack} from "@/types/types";
import FollowButton from "@/app/components/PublicProfile/FollowButton";
import { useSession } from "next-auth/react";


interface User {
    id: string;
    name: string;
    image: string;
    public: boolean;
    playlist: string;

}

interface TopArtist {
    id: string;
    name: string;
    uri?: string;
    genres?: string[];
    followers?: string;
    images: { url: string}[];
    popularity?: string;
    external_urls?: { spotify: string; }
}

export default function Profile() {

    const params = useParams();
    let handle = params?.handle;
    const session = useSession();
    const loggedInUserId = session?.data?.supabaseUserId
    console.log(loggedInUserId);


    if (Array.isArray(handle)) {
        handle = handle[0]
    }

    const [user, setUser] = useState<User | null>(null); // State to store user data
    const [isPublic, setIsPublic] = useState<boolean | null>(null);
    const [image, setImage] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [recentlyPlayed, setRecentlyPlayed] = useState<SpotifyTrack[] | null>(null);
    const [noData, setNoData] = useState(false);
    const [usersTopArtist, setUsersTopArtist] = useState<TopArtist | null>(null); // State to store top artist data

    useEffect(() => {
        if (!handle) return; // Prevent execution if handle is undefined

        // Fetch the users public profile data
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("name, image, public, playlist, recently_played, id")
                    .eq("handle", handle)
                    .single();

                console.log("data: ", data);
                const usersTopArtist = await getTopArtist(handle); // Fetch top artist data
                setUsersTopArtist(usersTopArtist)
                console.log("Top Artist:", usersTopArtist);




                if (error && error.code === "PGRST116") {
                    console.log(`No user with handle ${handle} was found`, error);
                    setNoData(true); // Set noData to true if user not found
                } else if (data) {
                    setUser(data); // Save user data
                    setIsPublic(data.public); // Save public status
                    setImage(data.image); // Save image
                    setPlaylistId(data.playlist); // Save playlist
                    setRecentlyPlayed(data.recently_played); // Save recently played
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();

    }, [handle]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto p-4">
                {noData ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <p className="text-4xl ">🙀 User {handle} not found</p>
                        <button
                            className="text-2xl text-gray-400 hover:underline focus:outline-none"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </button>
                    </div>
                ) : user ? (
                    isPublic ? (
                        <>
                            {/* Profile Header */}
                            <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 rounded-lg shadow-lg mb-8">
                                <div className="avatar mb-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                                        <Image
                                            src={image}
                                            alt="User Avatar"
                                            width={128}
                                            height={128}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                                <p className="text-gray-400 mb-2">@{handle}</p>

                                {/*Follow Button Top Right*/}
                                <div className="relative">
                                    {loggedInUserId && loggedInUserId !== user.id && (
                                        <FollowButton followee={loggedInUserId ?? null} followedId={user.id}/>

                                    )}
                                </div>

                                {usersTopArtist && (
                                    <UsersTopArtist
                                        id={usersTopArtist.id}
                                        name={usersTopArtist.name}
                                        images={usersTopArtist.images[0].url}
                                        genres={usersTopArtist.genres}
                                    >

                                    </UsersTopArtist>
                                )}

                                {/* Social Media Icons */}
                            </div>


                            {/* Recently Played Section */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
                                <h2 className="text-2xl font-bold mb-4">🎧 Recent Vibes</h2>
                                <RecentlyPlayed items={recentlyPlayed || []} />
                            </div>

                            {/* Playlist Section */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
                                <h2 className="text-2xl font-bold mb-4">📋 Showcased Playlist</h2>
                                <PlayList playlistId={playlistId} />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-screen">
                            <p className="text-4xl text-gray-400">Profile is private 😶‍🌫️</p>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-gray-400">Loading profile...</p>
                    </div>
                )}
            </div>
        </div>
    );
}