import LookingFor from "@/models/LookingFor";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const { id } = await req.json(); // Extract the 'id' from the request body

        // Use populate to replace category_id with the actual Category document
        let sections = await LookingFor.find({ cityIds: { $in: [id] } }).populate('category_id');

        return NextResponse.json({ success: true, sections });
    } catch (error) {
        console.error("An error occurred while fetching the lookingfor images:", error);
        return NextResponse.json({ success: false, error: "An error occurred while fetching the lookingfor images." });
    }
}
