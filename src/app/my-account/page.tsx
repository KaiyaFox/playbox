'use client';
import Link from "next/link";
import ProfileQR from "@/app/components/QrCode";
import {useState} from "react";
import {updateHandle} from "@/app/supabase/addSong";
import { useSession } from "next-auth/react";
import AlertMessage from "@/app/components/AlertMessage";


export default function MyAccount() {
    const {data: session} = useSession();
    const [handle, setHandle] = useState(""); // Replace with actual handle from user data
    const [inputError, setInputError] = useState(""); // State to store error message

    const validationInput = (value: string) => {
        const regex = /^[a-zA-Z0-9_]+$/; // Regex to allow only alphanumeric characters and underscores
        return regex.test(value)
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
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
        } catch (error) {
            console.error("Error updating handle:", error);
        }
    }

        return (
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
                <input
                    type="text"
                    placeholder="Your playlist"
                    className="input w-full max-w-xs"
                    onChange={handleChange}
                />
                <Link href="/delete">
                    <button className={"btn bg-red-900"}>Delete Account</button>
                </Link>
                <Link href="/settings">Public Profile</Link>
                <button className={"btn bg-blue-900"} onClick={handleSave}>Save</button>
                <ProfileQR/>
            </div>
        );
}


