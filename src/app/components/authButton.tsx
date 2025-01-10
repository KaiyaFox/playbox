// app/components/AuthButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
    const { data: session } = useSession();
    const avatar = session?.user?.image;
    console.log(avatar)

    return session ? (
        <>
            <button className="btn btn-primary" onClick={() => signOut()}>Sign
                Out {session.user?.name}</button>
            <Image src={avatar} alt={"User profile image"} width={50} height={50}/></>
    ) : (
        <button className="btn btn-primary" onClick={() => signIn("spotify")}>Sign In with Spotify</button>

    );
}
