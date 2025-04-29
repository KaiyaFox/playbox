"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {LogOut} from "lucide-react";

export default function AuthButton() {
    const { data: session } = useSession();
    const router = useRouter();

    const avatar = session?.user?.image;
    const userName = session?.user?.name ?? "U";
    const firstLetter = userName.charAt(0);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    if (!session) {
        return (
            <button className="btn btn-primary btn-sm" onClick={() => signIn("spotify")}>
                Sign In
            </button>
        );
    }

    return (
        <div className="dropdown dropdown-end ml-2">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt="User avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center rounded-full">
                            <span className="text-xl">{firstLetter}</span>
                        </div>
                    )}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-base-100 text-base rounded-box mt-3 w-72 py-3 px-2 shadow z-10"
            >
                <li>
                    <a onClick={() => handleNavigation("/")}>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a onClick={() => handleNavigation("/my-account")}>
                        Account Settings
                        <span className="badge bg-red-900">New</span>
                    </a>
                </li>
                <li>
                    <a onClick={() => handleNavigation("/about")}>
                        About
                    </a>
                </li>
                <li></li>
                <li>
                    <a onClick={() => signOut()}>Logout</a>
                    <LogOut className="mr-2" size={16} />
                </li>
            </ul>
        </div>
    );
}