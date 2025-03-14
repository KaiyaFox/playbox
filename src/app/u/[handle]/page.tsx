"use client";
import { getTopArtist } from "@/app/supabase/addSong";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import Image from "next/image";
import PlayList from "@/app/components/PlayList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTiktok,
    faYoutube,
    faBluesky,
} from "@fortawesome/free-brands-svg-icons";
import UsersTopArtist from "@/app/components/PublicProfile/UsersTop";


interface User {
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

    if (Array.isArray(handle)) {
        handle = handle[0]
    }

    const [user, setUser] = useState<User | null>(null); // State to store user data
    const [isPublic, setIsPublic] = useState<boolean | null>(null);
    const [image, setImage] = useState("");
    const [playlist, setPlaylist] = useState("");
    const [noData, setNoData] = useState(false);
    const [usersTopArtist, setUsersTopArtist] = useState<TopArtist | null>(null); // State to store top artist data

    useEffect(() => {
        if (!handle) return; // Prevent execution if handle is undefined

        const fetchUser = async () => {
            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("name, image, public, playlist")
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
                    setPlaylist(data.playlist); // Save playlist
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
                        <p className="text-2xl text-red-500">🙀 User {handle} not found</p>
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
                                <div className="flex space-x-6 mt-4">
                                    <a href="#" className="hover:text-blue-400">
                                        <FontAwesomeIcon icon={faBluesky} size="2x" />
                                    </a>
                                    <a href="#" className="hover:text-pink-500">
                                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                                    </a>
                                    <a href="#" className="hover:text-red-600">
                                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                                    </a>
                                    <a href="#" className="hover:text-blue-600">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                                    </a>
                                    <a href="#" className="hover:text-purple-500">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                                    </a>
                                </div>
                            </div>

                            {/* Playlist Section */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-bold mb-4">Showcased Playlist</h2>
                                <PlayList playlistId={playlist} />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-screen">
                            <p className="text-2xl text-gray-400">Profile is private 😶‍🌫️</p>
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