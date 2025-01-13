import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";

async function refreshAccessToken(token: any) {
    try {
        const basicAuth = Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64");

        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken as string,
            }),
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const refreshedToken = response.data;

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            expiresAt: Date.now() + refreshedToken.expires_in * 1000, // Expires in seconds
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Reuse old refresh token if none provided
        };
    } catch (error) {
        console.error("Error refreshing Spotify access token:", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions = {
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
        // Handle JWT Token (Access & Refresh Tokens)
        async jwt({ token, account }) {
            // Initial sign-in
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at * 1000; // Convert to ms
                return token;
            }

            // If the token is still valid, return it
            if (Date.now() < (token.expiresAt as number)) {
                return token;
            }

            // Token expired, refresh it
            return await refreshAccessToken(token);
        },

        // Expose tokens to the client session
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.expiresAt = token.expiresAt;
            session.error = token.error;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
