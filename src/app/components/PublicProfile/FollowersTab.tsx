import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FollowerEntry } from "@/types/types";
import Avatar from "@/app/components/PublicProfile/Avatar";

export default function FollowersTab({ userId }: { userId: string; userName: string }) {
    const router = useRouter();
    const [followers, setFollowers] = useState<FollowerEntry[]>([]); // update type as needed


    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch(`/api/follow-status?userId=${userId}`);
                const data = await response.json();
                setFollowers(data.followers || []);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        };

        fetchFollowers();
    }, [userId]);

    return (
        <>
            <p className="flex items-center justify-between p-6">Followers</p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {followers.map((followerEntry) => {
                const follower = followerEntry.follower;
                return (
                    <div
                        key={followerEntry.id}
                        className="cursor-pointer flex items-center gap-4 p-4 rounded-xl  hover:shadow-2xl transition-all duration-200 text-purple-600"
                        onClick={() => {
                            // Navigate to the follower's profile or perform an action
                            router.push(`/${follower.handle}`);
                        }}
                    >
                        <Avatar name={follower.name} imageUrl={follower.image} size={32} />
                        <div>
                            <p className="font-semibold">{follower.name}</p>
                            <p className="text-sm text-gray-500">
                                Followed on {new Date(followerEntry.created_at || "").toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
        </>

    );
}