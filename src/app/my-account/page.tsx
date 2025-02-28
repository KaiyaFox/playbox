'use client';
import Link from "next/link";
// import ProfileQR from "@/app/components/QrCode";
import {useEffect, useState} from "react";
import {updateHandle} from "@/app/supabase/addSong";
import { useSession } from "next-auth/react";
import {getUserPlaylists} from "@/lib/spotify";
import AlertMessage from "@/app/components/AlertMessage";
import {updatePlaylist} from "@/app/supabase/playlists";
import {getUserData} from "@/app/supabase/userHelper";


interface Playlist {
    id: string;
    name: string;
    // Add other properties as needed
}


export default function MyAccount() {
    const {data: session} = useSession();
    const [handle, setHandle] = useState(""); // Replace with actual handle from user data
    const [inputError, setInputError] = useState(""); // State to store error message
    const [playlist, setPlaylist] = useState([]); // Replace with actual playlist from user data
    const [selectedPlaylist, setSelectedPlaylist] = useState(""); // State to store selected playlist
    const [handleFromDb, setHandleFromDb] = useState(""); // State to store handle from database

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
                setPlaylist(data.items);
            })
            .catch((error) => console.error("Error fetching playlists:", error));

        // Fetch user data
        getUserData(session?.user?.email ?? "")
            .then((data) => {
                console.log("User Data:", data);

                // Check if data exists and has at least one element
                if (data && data.length > 0) {
                    setHandleFromDb(data[0].handle);
                    setHandle(data[0].handle);
                    setSelectedPlaylist(data[0].playlist);
                } else {
                    console.warn("No user data found for email:", session.user.email);
                    // Optionally, set default values or show an error message
                    setHandleFromDb("");
                    setHandle("");
                    setSelectedPlaylist("");
                }
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(session);
        if (validationInput(value)) {
            setHandle(value);
            setInputError(""); // Clear error message if input is valid
        } else {
            // console.error(error);
            setInputError("Invalid handle. Only alphanumeric characters and underscores are allowed.");
            console.log(inputError)
        }
    };

    const handleSave = async () => {
        // Simulate saving handle
        const userId = session?.user?.email;
        try {
            console.log(userId);
            await updateHandle(handle, userId);
            await updatePlaylist(selectedPlaylist, userId);
        } catch (error) {
            console.error("Error updating handle:", error);
        }
    }

    const handlePlaylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlaylist(e.target.value);
    }

    return session ? (
        <div className="container mx-auto p-4 relative min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Your PlayBox Account</h1>
                <p className="text-xl text-gray-600">{session.user.name}</p>
            </div>

            {/* Handle Section */}
            <div className="card bg-base-200 shadow-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Handle - www.playbox.music/u/{handleFromDb}</h2>
                <input
                    type="text"
                    placeholder="{handle}"
                    className="input input-bordered w-full max-w-xs"
                    value={handle}
                    onChange={handleChange}
                />
                {inputError && <AlertMessage message={inputError} />}
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
                    {playlist.map((playlist: Playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4 items-center">
                <Link href="/u/[handle]" as={`/u/${handle}`}>
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
            <h1 className="text-4xl font-bold">Please sign in to access your account.</h1>
        </div>
    );
}


