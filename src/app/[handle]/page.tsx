"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import Image from "next/image";

interface User {
    name: string;
    image: string;
    public: boolean;
}

export default function Profile() {
    const params = useParams();
    const handle = params?.handle; // Extracting handle from params
    const [user, setUser] = useState<User | null>(null); // State to store user data
    const [userName, setUserName] = useState(""); // State to store user name
    const [isPublic, setIsPublic] = useState()
    const [image, setImage] = useState("");

    useEffect(() => {
        if (!handle) return; // Prevent execution if handle is undefined

        const fetchUser = async () => {
            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("name, image, public") // Select all fields or specific ones
                    .eq("handle", handle)
                    .eq("public", true) // Only fetch if public is true
                    .single();

                console.log("data: ", data);

                if (error) {
                    console.log(`No user with handle ${handle} was found`, error);
                } else {
                    setUser(data); // Save user data
                    setUserName(data.name); // Save user name
                    setIsPublic(data.public); // Save public status
                    setImage(data.image); // Save image
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, [handle]); // Depend on handle

    return (
        <div className="text-4xl content-center text-center">
            {user ? (
                isPublic ? (
                    <>
                        <p>{userName}</p>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <Image src={image} alt="User Avatar" width="100" height="100" />
                            </div>
                        </div>
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
