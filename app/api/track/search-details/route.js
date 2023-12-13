import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import SearchTrack from "@/models/SearchTrack";

export async function POST(req) {
    try {
        const { userToken, searchQuery } = await req.json();

        await connectDB()

        await SearchTrack.create({ userToken, searchQuery });
        return NextResponse.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the Category : " + error });
    }
}