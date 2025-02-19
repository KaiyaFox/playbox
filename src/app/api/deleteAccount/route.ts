import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabase } from "@/lib/supabaseClient";


export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);

        const { error } = await supabase
            .from("users")
            .delete()
            .eq("email", session?.user?.email);

        if (error) {
            console.error("Error deleting user:", error);
            return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
        }

        return NextResponse.json({ success: "Account deleted" });
    } catch (error) {
        console.error("Error deleting Spotify account:", error);
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }
}