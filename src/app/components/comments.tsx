import { useState, useEffect } from 'react';
import { addCommentToSong } from "@/app/supabase/addSong";
import { getCommentsForSong } from "@/app/supabase/addSong";

interface CommentProps {
    spotifySongId: string;
    track: string;
    userId: string;
    onCommentsFetched: (comments: Comment[]) => void;
}

interface Comment {
    users: {name: string }[]; // Assuming users is an array of user objects
    comment: string;
    display_name: string;
    id: string;
    userId: string;
    text: string;
    createdAt: string; // Optional: For sorting, if your backend supports it
    count: number;
}

export default function Comments({ spotifySongId, userId, track, onCommentsFetched }: CommentProps) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSpotifyId, setCurrentSpotifyId] = useState(spotifySongId);
    // const [currentSongName, setCurrentSongName] = useState(track);
    // const [storePreviousSong, setStorePreviousSong] = useState(false);
    // const [alertMessages, setAlertMessages] = useState<AlertMessage[]>([]);

    // Fetch comments on component mount or when spotifyId changes
    useEffect(() => {
        if (commentText.trim().length === 0) {
            // If user hasnt typed shit update the currentspotifyId
            setCurrentSpotifyId(spotifySongId);
        }

        if (commentText.trim() !== '' && currentSpotifyId !== spotifySongId) {
            // Alert
            alert("You currently written a comment for different song. Either post your comment or clear it to comment on the currently playing song.");
           setCommentText(commentText)
            // setAlertMessages()
        } else {
            setCurrentSpotifyId(spotifySongId); // Update only if comment in progress
        }
        async function loadComments() {
            try {
                setIsLoading(true);
                const fetchedComments = await getCommentsForSong(spotifySongId);
                const mappedComments = (fetchedComments || []).map(comment => ({
                    id: comment.id,
                    song_id: comment.song_id,
                    comment: comment.comment,
                    created_at: comment.created_at,
                    user_id: comment.user_id,
                    users: comment.users,
                    display_name: comment.users[0]?.name || 'Anon',
                    userId: comment.user_id,
                    text: comment.comment,
                    createdAt: comment.created_at,
                    count: 0 // or any default value
                }));
                setComments(mappedComments);
                onCommentsFetched(mappedComments);
                // console.log("Comments: ", mappedComments);
            } catch (err) {
                console.error("Failed to load comments:", err);
            } finally {
                setIsLoading(false);
            }
        }

        loadComments();
    }, [spotifySongId, currentSpotifyId]); // Ensures component reloads when sp

    // Handle adding a new comment
    const handleClick = async () => {
        if (!commentText) return; // Prevent empty comments
        try {
            await addCommentToSong(userId, spotifySongId, commentText);
            setCommentText('');
            // Reload comments
            setIsLoading(true);
            const fetchedComments = await getCommentsForSong(spotifySongId);
            const mappedComments = (fetchedComments || []).map(comment => ({
                id: comment.id,
                song_id: comment.song_id,
                comment: comment.comment,
                created_at: comment.created_at,
                user_id: comment.user_id,
                users: comment.users,
                display_name: comment.users[0]?.name || 'Anon',
                userId: comment.user_id,
                text: comment.comment,
                createdAt: comment.created_at,
                count: 0 // or any default value
            }));
            setComments(mappedComments);
            onCommentsFetched(mappedComments);
            // console.log("Comments: ", mappedComments);
        } catch (err) {
            console.error("Failed to load comments:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="comments-section list bg-base-300/30 rounded-box shadow-md rounded-md p-10 max-w-2xl mx-auto shadow-md backdrop-blur-sm">
            <h2 className="text-gray-100 text-lg font-medium mb-2">Comments</h2>
            <p className="divider text-xs text-gray-500 mb-3">{track}</p>

            {isLoading ? (
                <p className="text-gray-400 text-sm">Loading comments...</p>
            ) : comments.length > 0 ? (
                <div className="comments-list overflow-y-auto max-h-80 pr-1 space-y-2">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-800/50 p-2 rounded-md">
                            <div className="flex flex-col text-left break-words overflow-auto">
                                <p className="text-xs text-purple-400 font-semibold break-words">{comment.users[0]?.name.toUpperCase() || "Anon"}</p>
                                <p className="text-gray-200 text-sm mt-1 break-words overflow ">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-sm italic">No comments on <strong>{track}</strong> yet.</p>
            )}

            <div className="mt-4">
    <textarea
        className="textarea textarea-bordered w-full h-24 bg-gray-800/70 text-gray-200 placeholder-gray-500 rounded-md focus:ring-1 focus:ring-purple-500 text-sm"
        placeholder="🎶 Share your thoughts..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
    ></textarea>
                <button
                    onClick={handleClick}
                    className="btn btn-primary btn-block mt-2 text-sm hover:scale-105 transition-transform duration-150"
                >
                    Post
                </button>
            </div>
        </div>


    );

}