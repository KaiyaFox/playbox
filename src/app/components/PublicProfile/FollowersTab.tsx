// // Tab that shows the users followers
import { useEffect, useState } from "react";


type Follower = {
    id: string;
    created_at: string;
    follower: {
        id: string;
        name: string;
    };
};


export default function FollowersTab({ userId }: { userId: string }) {
    const [followers, setFollowers] = useState<Follower[]>([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch(`/api/follow-status?userId=${userId}`, {
                    method: "GET",
                });
                const data = await response.json();
                console.log("Followers data: ", data);
                setFollowers(data.followers || []);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        };

        fetchFollowers();
    }, [userId]);

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Follower</th>
                    <th>Followed At</th>
                </tr>
                </thead>
                <tbody>
                {followers.map((followerEntry) => (
                    <tr key={followerEntry.id}>
                        <td>{followerEntry.follower?.name || "Unknown"}</td>
                        <td>{new Date(followerEntry.created_at).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}