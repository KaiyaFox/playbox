"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthButton from "@/app/components/authButton";

export default function Navbar() {
    const router = useRouter();

    const handleClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
            {/* Left / Brand */}
            <div className="flex-1">
                <button
                    className="btn btn-ghost text-xl"
                    onClick={() => handleClick("/")}
                >
                    PlayBox
                </button>
            </div>

                {/* Auth Button (optional) */}
                <AuthButton />
        </div>
    );
}