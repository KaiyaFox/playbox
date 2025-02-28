// Helper functions for calling spotify API from client

import { getSession } from "next-auth/react";

export async function getUserPlaylists(userId: string | undefined) {

    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
        throw new Error("No access token found");
    }

    const playlistUrl = "https://api.spotify.com/v1/users/" + userId + "/playlists";
    console.log(playlistUrl)


    const response = await fetch(playlistUrl, {
        method: "GET",
        headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch playlists");
    }
    const data = await response.json();
    console.log(data);
    return data;
}