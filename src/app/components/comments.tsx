import { useState, useEffect } from 'react';
import { addCommentToSong } from "@/app/supabase/addSong";
import { getCommentsForSong } from "@/app/supabase/addSong";
import AlertMessage from "@/app/components/AlertMessage";

interface CommentProps {
    spotifyId: string;
    track: string;
    userId: string;
}

interface Comment {
    users: string;
    comment: string;
    display_name: string;
    id: string;
    userId: string;
    text: string;
    createdAt: string; // Optional: For sorting, if your backend supports it
    count: number;
}

export default function Comments({ spotifyId, userId, track }: CommentProps) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSpotifyId, setCurrentSpotifyId] = useState(spotifyId);
    const [alertMessages, setAlertMessages] = useState<AlertMessage[]>([]);

    // Fetch comments on component mount or when spotifyId changes
    useEffect(() => {
        if (commentText.trim().length === 0) {
            // If user hasnt typed shit update the currentspotifyId
            setCurrentSpotifyId(spotifyId);
        }

        if (commentText.trim() !== '') {
            // Alert
           // setAlertMessages()
        } else {
            setCurrentSpotifyId(spotifyId); // Update only if comment in progress
        }
        async function loadComments() {
            try {
                setIsLoading(true);
                const fetchedComments = await getCommentsForSong(spotifyId);
                setComments(fetchedComments || []);
                console.log("Comments: ", fetchedComments);
            } catch (err) {
                console.error("Failed to load comments:", err);
            } finally {
                setIsLoading(false);
            }
        }

        loadComments();
    }, [spotifyId]);

    // Handle adding a new comment
    const handleClick = async () => {
        if (!commentText) return; // Prevent empty comments
        try {
            await addCommentToSong(userId, spotifyId, commentText);
            setCommentText('');

            // Optionally reload comments to show the new one
            const updatedComments = await getCommentsForSong(spotifyId);
            setComments(updatedComments || []);
        } catch (err) {
            console.error("Failed to add comment:", err);
        }
    };

    return (
        <div className="comments-section bg-gray-900/70 rounded-md p-4 max-w-2xl mx-auto shadow-md backdrop-blur-sm">
            <h2 className="text-gray-100 text-lg font-medium mb-2">Comments</h2>
            <p className="divider text-xs text-gray-500 mb-3">{track}</p>

            {isLoading ? (
                <p className="text-gray-400 text-sm">Loading comments...</p>
            ) : comments.length > 0 ? (
                <div className="comments-list overflow-y-auto max-h-40 pr-1 space-y-2">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-800/50 p-2 rounded-md">
                            <div className="flex flex-col text-left break-words overflow-auto">
                                <p className="text-xs text-purple-400 font-semibold break-words">{comment.users?.name.toUpperCase() || "Anon"}</p>
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


    )
        ;
}