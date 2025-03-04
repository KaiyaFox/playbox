import { NextResponse, NextRequest } from "next/server";
import QRCode from "qrcode";

const AppUrl = "https://playbox-two.vercel.app/u/";

export async function GET(req: NextRequest) {
    try {
        // Extract `handle` from the URL path
        const handle = req.nextUrl.pathname.split("/").pop();

        if (!handle) {
            return NextResponse.json({ error: "Handle is required" }, { status: 400 });
        }

        const profileUrl = `${AppUrl}${handle}`;
        const qrCode = await QRCode.toDataURL(profileUrl);

        return NextResponse.json({ qrCode }, { status: 200 });
    } catch (error) {
        console.error("Error generating QR code:", error);
        return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
    }
}