interface PlayListProps {
    playlistId: string; // The playlistId will be passed as a prop
}

export default function PlayList({ playlistId }: PlayListProps) {
    return (
        <>
        <div className="container mx-auto">
        </div>
        <iframe
            className="mx-auto"
            title="Spotify Playlist"
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
            width="90%" height="500"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ background: 'transparent' }}
        >
        </iframe>
        </>

    );
}