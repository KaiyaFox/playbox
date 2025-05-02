
export interface RecentlyPlayedTracks {
    track: SpotifyTrack[];
}

export interface SpotifyTrack {
    id: string;
    name: string;
    popularity?: number;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[] };
    external_urls?: { spotify: string };
    genre?: string[];
    isPlaying?: boolean;
}

export interface Recent {
    tracks: SpotifyTrack[];
}
// // Use this interface to get the recently played tracks from Spotify. It adds the track property to the items array
// export interface SpotifyRecentlyPlayedResponse {
//     items: {track: SpotifyTrack}[];
// }


export interface SpotifyUser {
    name: string;
    id: string;
    image: string;
    public: boolean;
    playlist: string;
    recently_played: RecentlyPlayedTracks;
}

export interface PlayBoxUser {
    name: string;
    id: string;
    spotify_id: string;
    handle: string;
    top_artist: string;
    email: string;
    image: string;
    public: boolean;
    playlist: string;
    recently_played: RecentlyPlayedTracks;
    comments?: string[];
    followers?: string[];
}

// interface SpotifyProfile extends Profile {
//     id: string;
//     email: string;
//     display_name: string;
//     images: { url: string }[];
// }

export interface FollowerEntry {
    id: string;
    created_at: string;
    follower: {
        handle: string;
        name: string;
        image: string;
    };
}

export interface HandPickedTrack {
    id: string;
    name: string;
    artists: { name: string }[]; // can have multiple artists
    image: string;
    url: string;
};