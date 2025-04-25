// Gets the follow status of a user

import {NextRequest} from "next/server";
import {supabase} from "@/lib/supabaseClient";
import {getServerSession} from "next-auth";
import {authOptions} from '@/lib/authOptions';
import { NextResponse } from "next/server";

// Retrieve the follow status of a user
export async function POST(request: NextRequest) {
    const { followerId, followingId } = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Check if the user is already following
        const { data: existingFollow, error: existingFollowError } = await supabase
            .from("follows")
            .select("*")
            .eq("follower_id", followerId)
            .eq("following_id", followingId)
            .maybeSingle() // Use maybeSingle to avoid throwing an error if no rows are found
        if (existingFollowError) {
            console.log(existingFollowError);
            return NextResponse.json({ error: existingFollowError});
        }

        return NextResponse.json({ isFollowing: !!existingFollow }, { status: 200 });
    } catch (error) {
        console.error("Error checking follow status:", error);
        return NextResponse.json({ error: "Failed to check follow status" }, { status: 500 });
    }

}

// Get how many followers a user has
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from("follows")
            .select("*")
            .eq("following_id", userId);

        if (error) {
            console.error("Error fetching followers:", error);
            return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 });
        }

        return NextResponse.json({ followersCount: data?.length || 0 }, { status: 200 });
    } catch (error) {
        console.error("Error fetching followers:", error);
        return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 });
    }
}