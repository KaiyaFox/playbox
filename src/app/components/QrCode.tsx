"use client";
import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
import Image from "next/image";

interface ProfileQRProps {
    userHandle: string;
}

export default function ProfileQR({ userHandle }: ProfileQRProps) {
    // const { handle } = useParams();
    const [qrCode, setQrCode] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching QR code for handle:", userHandle);
        if (!userHandle)
            return;

        const fetchQRCode = async () => {
            try {
                const res = await fetch(`/api/qr/${userHandle}`);
                const data = await res.json();
                if (data.qrCode) setQrCode(data.qrCode);
                console.log("QR Code data:", data);
            } catch (error) {
                console.error("Failed to fetch QR code", error);
            }
        };

        fetchQRCode();
    }, [userHandle]);

    return (
        <div>
            <h1>QR Code for {userHandle}</h1>
            {qrCode ?
                <Image src={qrCode} alt={"qr-code"} width={200} height={200} /> : <p>Generating QR Code...</p>}
        </div>
    );
}
