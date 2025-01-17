import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import {Account, NextAuthOptions, Profile, User} from "next-auth";
import { createClient} from "@supabase/supabase-js";
import {AdapterUser} from "next-auth/adapters";

interface SpotifyProfile extends Profile {
    id: string;
    email: string;
    display_name: string;
    images: { url: string }[];
}
// Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
)
// Extend the Session type to include refreshToken and expiresAt
declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        supabaseUserId?: string;
    }
}

// Extend the JWT type to include refreshToken and expiresAt
declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        supabaseUserId: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization:
                "https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read,user-read-playback-state,user-read-recently-played",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({token, account, profile}) {
            console.log("Callback")

            if (account && profile) {
                const spotifyProfile = profile as SpotifyProfile;
                token.accessToken = account.access_token as string;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at ? account.expires_at * 1000 : undefined;
                console.log("Spotify Profile:", spotifyProfile);


                // Check for email in Supabase
                const {data: existingUser} = await supabase
                    .from("users")
                    .select("email")
                    .eq("email", spotifyProfile.email)
                    .single();

                if (!existingUser) {
                    const {data, error: insertError} = await supabase
                        .from("users")
                        .insert({
                            email: spotifyProfile.email,
                            name: spotifyProfile.display_name,
                            image: spotifyProfile.images?.[0]?.url || "",
                        })
                        .select("id")
                        .single();

                    if (insertError) {
                        console.error("Failed to create user in Supabase:", insertError);
                    } else {
                        token.supabaseUserId = data.id;
                    }
                } else {
                    token.supabaseUserId = spotifyProfile.id;
                }
            }
            return token;
        },
        // Add the user to the session
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken;
            session.expiresAt = token.expiresAt;
            return session;
        }


    },
}