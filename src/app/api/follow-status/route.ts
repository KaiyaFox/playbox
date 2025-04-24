// Gets the follow status of a user

import {NextRequest} from "next/server";
import {supabase} from "@/lib/supabaseClient";
import {getServerSession} from "next-auth";
import {authOptions} from '@/lib/authOptions';
import { NextResponse } from "next/server";

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