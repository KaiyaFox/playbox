export interface RecentlyPlayedTracks {
    track: SpotifyTrack[];
}

export interface SpotifyTrack {
    id: string;
    name: string;
    popularity?: number;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls?: { spotify: string };
    genre?: string[];
    isPlaying?: boolean;
}

export interface Recent {
    tracks: SpotifyTrack[];
}
// Use this interface to get the recently played tracks from Spotify. It adds the track property to the items array
export interface SpotifyRecentlyPlayedResponse {
    items: {track: SpotifyTrack}[];
}