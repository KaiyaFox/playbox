import {NextResponse, NextRequest} from "next/server";
import {supabase} from "@/lib/supabaseClient";
import {getServerSession} from "next-auth";
import {authOptions} from '@/lib/authOptions';


// Follow a user
// FollowerId: The ID of the user who is following
// FollowingId: The ID of the user who is being followed
export async function POST(request: NextRequest) {
    // Get the followerId and followingId from the request body
    const { followerId, followingId } = await request.json();

    // Log the request body for debugging
    console.log(followerId);
    console.log(followingId);

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // prevent follwing yourself
        if (followingId === followerId) {
            console.log("You cannot follow yourself");
            return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
        }

        // Check if the user is already following
        const { data: exsistingFollow, error: exsistingFollowError } = await supabase
            .from("follows")
            .select("*")
            .eq("follower_id", followerId)
            .eq("following_id", followingId)
            .maybeSingle() // Use maybeSingle to avoid throwing an error if no rows are found
        if (exsistingFollowError) {
            console.log(exsistingFollowError);
            return NextResponse.json({ error: exsistingFollowError});
        }

        if (exsistingFollow) {
            return NextResponse.json({ error: "You are already following this user" }, { status: 400 });
        }
        // Insert the new follow relationship
        const { data, error } = await supabase
            .from("follows")
            .insert([{ follower_id: followerId, following_id: followingId }]);
        if (error) {
            console.log(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        // Return the newly created follow relationship
        return NextResponse.json({ data }, { status: 201 });

    }
    catch (error) {
        console.error("Error following user:", error);
        return NextResponse.json({ error: "Failed to follow user" }, { status: 500 });
    }

}



// Unfollow a user
export async function DELETE(request: NextRequest) {
    const { followerId, followingId } = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Delete the follow relationship
        const { error } = await supabase
            .from("follows")
            .delete()
            .eq("follower_id", followerId)
            .eq("following_id", followingId);

        if (error) {
            console.error("Error unfollowing user:", error);
            return NextResponse.json({ error: "Failed to unfollow user" }, { status: 500 });
        }

        return NextResponse.json({ message: "Unfollowed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        return NextResponse.json({ error: "Failed to unfollow user" }, { status: 500 });
    }
}