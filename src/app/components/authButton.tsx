// app/components/AuthButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";


export default function AuthButton() {

    const { data: session } = useSession();
    const avatar = session?.user?.image;
    const userName = session?.user?.name ?? "U";
    const firstLetter = userName.charAt(0)
    
    // Convert session unix time to human read


    if (!session) {
        console.log("No Session!")
    } else {
        console.log(`Session active! Expires ${session.expiresAt}`, Date.now());
    }

    return session ? (
        <>
            <button className="btn btn-primary btn-sm mr-3" onClick={() => signOut()}>Sign Out</button>
            {avatar ? (
                <Image className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2" src={avatar} alt={"User profile image"} width={30} height={30} />
            ) : (
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                        <span className="text-3xl">{firstLetter}</span>
                    </div>
                </div>
            )}
        </>
    ) : (
        <button className="btn btn-primary btn-sm" onClick={() => signIn("spotify")}>Sign In</button>

    );
}
