import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/app/components/navbar";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import SessionWrapper from "@/app/components/SessionWrapper"; // Import the wrapper
import { Session } from "next-auth";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions); // Fetch session on the server

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper session={session as Session}>
            <Navbar />
            {children}
            <Footer />
        </SessionWrapper>
        </body>
        </html>
    );
}
