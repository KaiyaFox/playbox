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
        bio: "",
    });

    console.log("Session data:", session);

    const validationInput = (value: string) => {
        if (value === "") return true
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
                        bio: data[0].bio,
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
                        bio: "",
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
            await updateUserProfile(userId, userData.name, userData.handle, userData.selectedPlaylist, userData.publicProfile, userData.bio);
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
        <div className="container mx-auto p-4 max-w-3xl">
            {/* Profile Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">Welcome back, {session.user.name} 👋</h1>
                <p className="text-lg text-gray-500">Manage your public profile and preferences</p>
            </div>

            {/* Handle Section */}
            <div className="card bg-base-200 shadow-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Custom Profile Handle</h2>
                <p className="mb-2 text-sm text-gray-500">This is your public username for your PlayBox profile.</p>
                <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
                    <span className="text-gray-400">playbox.music/u/</span>
                    <input
                        type="text"
                        className="grow"
                        placeholder="your_handle"
                        value={userData.handle}
                        onChange={handleChange}
                    />
                </label>
                {inputError && <AlertMessage message={inputError} />}
                {userData.handle && (
                    <div className="mt-6">
                        <p className="font-medium text-sm mb-2">Your QR Code</p>
                        <ProfileQR userHandle={userData.handle} />
                    </div>
                )}
            </div>

            {/*Bio*/}
            <div className="card bg-base-200 shadow-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Bio</h2>
                <p className="mb-2 text-sm text-gray-500">Add a short bio to your profile.</p>
                <textarea
                    className="textarea textarea-bordered w-full max-w-md"
                    placeholder="Tell us about yourself..."
                    value={userData.bio}
                    onChange={(e) =>
                        setUserData((prevData) => ({ ...prevData, bio: e.target.value }))
                    }
                />
            </div>


            {/* Playlist Selector */}
            <div className="card bg-base-200 shadow-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Showcased Playlist</h2>
                <p className="mb-2 text-sm text-gray-500">Select a playlist to feature on your public profile.</p>
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={userData.selectedPlaylist}
                    onChange={handlePlaylistChange}
                >
                    <option disabled value="">
                        Choose a playlist
                    </option>
                    {Array.isArray(userData.playlist) &&
                        userData.playlist.map((playlist: Playlist) => (
                            <option key={playlist.id} value={playlist.id}>
                                {playlist.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Profile Visibility */}
            <div className="card bg-base-200 shadow-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Profile Visibility</h2>
                <div className="flex items-center gap-3">
                    <span className="text-sm">Enable public profile</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={userData.publicProfile}
                        onChange={handleVisibilityChange}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 items-center mt-8">
                <Link href="/[handle]" as={`/${userData.handle}`}>
                    <button className="btn btn-primary w-full max-w-md">View Public Profile</button>
                </Link>
                <button className="btn btn-success w-full max-w-md" onClick={handleSave}>
                    Save Changes
                </button>
                <Link href="/delete">
                    <button className="btn btn-error w-full max-w-md">Delete My Account</button>
                </Link>
            </div>
        </div>
    ) : (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold">Sign in to access your account.</h1>
        </div>
    );
}


