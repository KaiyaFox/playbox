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

            <button className="btn btn-primary btn-sm mr-3" onClick={() => signOut()}>Sign
                Out
            </button>

            <Image className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2" src={avatar} alt={"User profile image"} width={30} height={30}/>
            </>
            ) : (
        <button className="btn btn-primary btn-sm" onClick={() => signIn("spotify")}>Sign In</button>

    );
}
