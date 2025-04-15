"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Footer() {
    const router = useRouter();

    const handleClick = (path: string) => {
        console.log(`Navigating to ${path}`);
        router.push(path); // Navigate to the specified path
    };

    return (
        <footer className="footer footer-center p-4 bg-base-100 text-base-content text-sm">
            <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/CHISTAR1.png"
                        alt="Chicago Star"
                        width={16}
                        height={16}
                    />
                    <p>Built in Chicago with ❤️ by PlayBox</p>
                </div>
                <div className="flex space-x-4">
                    <button className="btn btn-ghost btn-xs" onClick={() => handleClick("/about")}>
                        About
                    </button>
                    <button className="btn btn-ghost btn-xs" onClick={() => handleClick("/privacy-policy")}>
                        Privacy Policy
                    </button>
                </div>
                <p className="text-xs">Copyright © 2025 - All rights reserved by PlayBox</p>
            </div>
        </footer>
    );
}