
export default function FollowButton() {
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
                followerId: "b1c7582b-25a2-42ae-9cc4-a713a13a9469", // Replace with actual follower ID
                followingId: "7e3338c3-2ce7-4331-965e-77958ffe6130", // Replace with actual following ID
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