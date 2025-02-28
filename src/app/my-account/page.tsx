'use client';
import Link from "next/link";
import ProfileQR from "@/app/components/QrCode";
import {useEffect, useState} from "react";
import {updateHandle} from "@/app/supabase/addSong";
import { useSession } from "next-auth/react";
import {getUserPlaylists} from "@/lib/spotify";
import AlertMessage from "@/app/components/AlertMessage";
import {updatePlaylist} from "@/app/supabase/playlists";


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

    console.log("Session data:", session);

    const validationInput = (value: string) => {
        const regex = /^[a-zA-Z0-9_]+$/; // Regex to allow only alphanumeric characters and underscores
        return regex.test(value)
    }

    useEffect(() => {
        if (!session) return;
        getUserPlaylists(session?.user.spotifyId)
            .then(data => setPlaylist(data.items))
            .catch(error => console.error("Error fetching playlists:", error));
    } , [session])

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

        return (
            session ? (
                <div className="container mx-auto">
                    <h1>My Account</h1>
                    <br>
                    </br>
                    <h2>Handle</h2>
                    <input
                        type="text"
                        placeholder="Your handle"
                        className="input w-full max-w-xs"
                        value={handle}
                        onChange={handleChange}
                    />
                    {inputError && <AlertMessage message={inputError} />}

                    <br>
                    </br>
                    <h2>Showcase Playlist</h2>
                    <br>
                    </br>
                    <select className="select select-bordered w-full max-w-xs" onChange={handlePlaylistChange}>
                        <option disabled selected>Choose a playlist</option>
                        {playlist.map((playlist: Playlist) => (
                            <option
                                key={playlist.id}
                                value={playlist.id}>{playlist.name}</option>
                        ))}
                    </select>

                    <Link href="/delete">
                        <button className={"btn bg-red-900"}>Delete Account</button>
                    </Link>
                    <Link href="/settings">Public Profile</Link>
                    <button className={"btn bg-blue-900"} onClick={handleSave}>Save</button>
                    <ProfileQR/>
                </div>
            ) : (
                <div className="container mx-auto text-2xl text-center">
                    <h1>Please sign in to access your account.</h1>
                </div>
            )

        );
}


