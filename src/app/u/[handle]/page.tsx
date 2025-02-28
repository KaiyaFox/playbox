// Public page for users profile.
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import Image from "next/image";
import PlayList from "@/app/components/PlayList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok, faYoutube, faBluesky } from "@fortawesome/free-brands-svg-icons";


interface User {
    name: string;
    image: string;
    public: boolean;
}
export default function Profile() {
    const params = useParams();
    const handle = params?.handle; // Extracting handle from params
    const [user, setUser] = useState<User | null>(null); // State to store user data
    const [ setUserName] = useState(""); // State to store user name
    const [isPublic, setIsPublic] = useState<boolean | null>(null)
    const [image, setImage] = useState("");
    const [playlist, setPlaylist] = useState("");
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        if (!handle) return; // Prevent execution if handle is undefined

        const fetchUser = async () => {
            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("name, image, public, playlist") // Select all fields or specific ones
                    .eq("handle", handle)
                    .single();

                console.log("data: ", data);

                if (error && error.code === "PGRST116") {
                    console.log(`No user with handle ${handle} was found`, error);
                    setNoData(true); // Set noData to true if user not found
                } else if (data) {
                    setUser(data); // Save user data
                    //setUserName(data.name); // Save user name
                    setIsPublic(data.public); // Save public status
                    setImage(data.image); // Save image
                    setPlaylist(data.playlist); // Save playlist
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, [handle, setUserName]); // Depend on handle

    return (
        <div className="text-4xl content-center text-center">
            {noData ? (
                <p>🙀User {handle} not found</p>
            ) : user ? (
                isPublic ? (
                    <>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <Image src={image} alt="User Avatar" width="100" height="100"/>
                            </div>
                        </div>
                        <div className="flex space-x-4 text-1xl justify-center">
                            <FontAwesomeIcon icon={faBluesky} className="text-gray-600" />
                            <FontAwesomeIcon icon={faTiktok} className="text-gray-600" />
                            <FontAwesomeIcon icon={faYoutube} className="text-gray-600" />
                            <FontAwesomeIcon icon={faFacebook} className="text-gray-600" />
                            <FontAwesomeIcon icon={faInstagram} className="text-gray-600" />
                        </div>
                        <div className="flex justify-center ">
                            <p>{handle}</p>
                        </div>
                        <PlayList playlistId={playlist}/>
                    </>
                ) : (
                    <p>Profile is private 😶‍🌫️</p>
                )
            ) : (
                <p>
                    <span className="loading loading-ring loading-lg"></span>
                </p>
            )}
        </div>
    );
}
