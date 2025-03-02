'use client';
import Link from "next/link";
import ProfileQR from "@/app/components/QrCode";
import {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import {getUserPlaylists} from "@/lib/spotify";
import AlertMessage from "@/app/components/AlertMessage";
import {updateUserProfile} from "@/app/supabase/userHelper";
import {getUserData} from "@/app/supabase/userHelper";


interface Playlist {
    id: string;
    name: string;
    // Add other properties as needed
}


export default function MyAccount() {
    const {data: session} = useSession();
    // const [handle, setHandle] = useState(""); // Replace with actual handle from user data
    const [inputError, setInputError] = useState(""); // State to store error message
    // const [playlist, setPlaylist] = useState([]); // Replace with actual playlist from user data
    // const [selectedPlaylist, setSelectedPlaylist] = useState(""); // State to store selected playlist
    // const [handleFromDb, setHandleFromDb] = useState(""); // State to store handle from database
    // const [publicProfile, setPublicProfile] = useState(false); // State to store public profile status

    const [userData, setUserData] = useState({
        name: "",
        handle: "",
        playlist: [] as Playlist[],
        selectedPlaylist: "",
        publicProfile: false,
    });

    console.log("Session data:", session);

    const validationInput = (value: string) => {
        const regex = /^[a-zA-Z0-9_]+$/; // Regex to allow only alphanumeric characters and underscores
        return regex.test(value)
    }

    useEffect(() => {
        if (!session) return;

        // Fetch playlists
        getUserPlaylists(session?.user.spotifyId)
            .then((data) => {
                console.log("Playlists:", data.items);
                setUserData((prevData => ({
                    ...prevData,
                    playlist: data.items,
                })
                ));
            })
            .catch((error) => console.error("Error fetching playlists:", error));

        // Fetch user data
        getUserData(session?.user?.email ?? "")
            .then((data) => {
                console.log("User Data:", data);

                // Check if data exists and has at least one element
                if (data && data.length > 0) {
                    setUserData({
                        name: data[0].name,
                        handle: data[0].handle,
                        playlist: data[0].playlist,
                        selectedPlaylist: data[0].playlist,
                        publicProfile: data[0].public,
                    });

                } else {
                    console.warn("No user data found for email:", session.user.email);
                    // Optionally, set default values or show an error message
                    setUserData({
                        name: "",
                        handle: "",
                        playlist: [],
                        selectedPlaylist: "",
                        publicProfile: false,
                    });
                }
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validationInput(value)) {
            setUserData((prevData) => ({ ...prevData, handle: value }));
        } else {
            setInputError("Invalid handle. Only alphanumeric characters and underscores are allowed.");
        }
    };

    const handleSave = async () => {
        const userId = session?.user?.email;
        try {
            await updateUserProfile(userId, userData.name, userData.handle, userData.selectedPlaylist, userData.publicProfile);
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    const handlePlaylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserData((prevData) => ({ ...prevData, selectedPlaylist: e.target.value }));
    };

    const handleVisibilityChange = () => {
        setUserData((prevData) => ({ ...prevData, publicProfile: !prevData.publicProfile }));
    };

    return session ? (
        <div className="container mx-auto p-4 relative min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Your PlayBox Account</h1>
                <p className="text-xl text-gray-600">{session.user.name}</p>
            </div>

            {/* Handle Section */}
            <div className="card bg-base-200 shadow-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Handle - www.playbox.music/u/{userData.handle}</h2>
                <input
                    type="text"
                    placeholder="{handle}"
                    className="input input-bordered w-full max-w-xs"
                    value={userData.handle}
                    onChange={handleChange}
                />
                {inputError && <AlertMessage message={inputError} />}
                <h2 className="text-2xl font-semibold mb-4">Qr Code</h2>
                {userData.handle && <ProfileQR userHandle={userData.handle} />}
            </div>


            {/* Playlist Section */}
            <div className="card bg-base-200 shadow-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Showcased Playlist</h2>
                <p className="italic">Select one of your playlists to showcase on your profile.</p>
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={handlePlaylistChange}
                >
                    <option disabled selected>
                        Choose a playlist
                    </option>
                    {Array.isArray(userData.playlist) && userData.playlist.map((playlist: Playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Profile Section */}
            <div className="card bg-base-200 shadow-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                <p className="italic">Enable Profile Visibility</p>
                <label className="flex items-center space-x-3">
                    <span>Visibility</span>
                    <input type="checkbox" className="toggle toggle-primary" checked={userData.publicProfile} onChange={handleVisibilityChange} />
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4 items-center">
                <Link href="/u/[handle]" as={`/u/${userData.handle}`}>
                    <button className="btn btn-primary w-full max-w-xs">View Your Public Profile</button>
                </Link>
                <button className="btn btn-success w-full max-w-xs" onClick={handleSave}>
                    Save
                </button>
            </div>

            {/* Delete Button (Positioned Bottom-Right) */}
            <div className="fixed bottom-4 right-4">
                <Link href="/delete">
                    <button className="btn btn-error">Delete Account</button>
                </Link>
            </div>

            {/* QR Code Section */}
            <div className="mt-8 text-center">
                {/* Add QR Code component here if needed */}
            </div>
        </div>
    ) : (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold">Sign in to access your account.</h1>
        </div>
    );
}


