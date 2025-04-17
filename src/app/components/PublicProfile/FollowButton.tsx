import { useState } from "react";
import {PlayBoxUser} from "@/types/types";


interface FollowButtonProps {
    followee: string | null;
    followedId: string | null;
}
export default function FollowButton({followee, followedId }: FollowButtonProps) {

    // Make button dynamic so that it shows "Following" if the user is already following and "Follow" if not and Unfollow if the user is already following

    const [followerId, setFollowerId] = useState<PlayBoxUser | null>(null);
    const [followingId, setFollowingId] = useState<PlayBoxUser | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);


console.log("I am: ", followee);


    const handleFollow = () => {
        // Handle follow logic here
        console.log("Follow button clicked");



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
                } else {
                    console.error("Failed to follow");
                    console.log(response)
                }
            })
            .catch(error => {
                console.error("Error following user:", error);
            });
    }
    return(
        <button
            className="btn btn-primary"
            onClick={handleFollow}
        >
            Follow
        </button>
    )
}