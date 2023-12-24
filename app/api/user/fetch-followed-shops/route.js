import Store from "@/models/Store";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = await req.json();

        // Connecting to the database
        await connectDB();

        const stores = await Store.find({ followers: { $in: [userId] } });

        return NextResponse.json({ success: true, message: "Followed stores fetched successfully", stores });

    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the user: " + error });
    }
}