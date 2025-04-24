import {useEffect, useState} from "react";


interface FollowButtonProps {
    followee: string | null;
    followedId: string | null;
}
export default function FollowButton({followee, followedId }: FollowButtonProps) {

    // Make button dynamic so that it shows "Following" if the user is already following and "Follow" if not and Unfollow if the user is already following


    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const response = await fetch("/api/follow-status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        followerId: followee,
                        followingId: followedId,
                    }),
                });
                const data = await response.json();
                console.log("Follow status data: ", data);
                setIsFollowing(data.isFollowing);
            } catch (error) {
                console.error("Error fetching follow status:", error);
            }
        };

        fetchFollowStatus();
    })


console.log("I am: ", followee);


    const handleFollow = () => {
        // Handle follow logic here
        console.log("Follow button clicked");
        setLoading(true);



        // Call follow API
        fetch("/api/follow", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                followerId: followee, // Replace with actual follower ID
                followingId: followedId, // Replace with actual following ID
                }
            ),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Followed successfully");
                    setIsFollowing(true);
                    setLoading(false);
                } else {
                    console.error("Failed to follow");
                    setIsFollowing(false);
                    setLoading(false);
                    console.log(response)
                }
            })
            .catch(error => {
                console.error("Error following user:", error);
                setLoading(false);
            });
    }
    return(
        isFollowing ? (
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setLoading(true);
                        console.log("Unfollow button clicked");
                        // Call unfollow API
                        fetch("/api/unfollow", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                followerId: followee,
                                followingId: followedId,
                            }),
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log("Unfollowed successfully");
                                    setIsFollowing(false);
                                } else {
                                    console.error("Failed to unfollow");
                                    setIsFollowing(false);
                                }
                            })
                            .catch(error => {
                                console.error("Error unfollowing user:", error);
                                setIsFollowing(false);
                            })
                            .finally(() => setLoading(false));
                    }}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Processing..." : "Unfollow"}
                </button>
        ) :
        (followee === followedId) ? (
            <button
                className="btn btn-secondary"
                disabled
            >
                You cant follow yourself
            </button>
        ) : (
            <button
                className="btn btn-primary"
                onClick={handleFollow}
            >
                Follow
            </button>
        )
    )
}