'use client';
import Link from "next/link";
import ProfileQR from "@/app/components/QrCode";
import {useEffect, useState} from "react";

export default function MyAccount() {
    const [handle, setHandle] = useState("user123"); // Replace with actual handle from user data

    useEffect(() => {
        // Simulate fetching handle from user data
        const fetchHandle = async () => {
            // Simulate fetching handle from user data
            setHandle("exampleHandle"); // Replace with actual handle from user data
        }
        fetchHandle();
    }, [handle]); // Dependency array ensures the effect runs when handle changes
    return (
        <div className="container mx-auto">
            <h1>My Account</h1>
            <br>
            </br>
            <h2>Handle</h2>
            <input type="text" placeholder={handle} className="input w-full max-w-xs" />
            <br>
            </br>
            <Link href="/delete">
                <button className={"btn bg-red-900"}>Delete Account</button>
            </Link>
            <Link href="/settings">Public Profile</Link>
            <button className={"btn bg-blue-900"}>Save</button>
            <ProfileQR />
        </div>
    );
}

