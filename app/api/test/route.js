import Store from "@/models/Store";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Connecting to database
        await connectDB();

        // Checking if the Vendor already exists
        let stores = await Store.find();

        for (let store of stores) {
            store.followers = []
            await store.save();
        }

        return NextResponse.json({ success: true, message: "Store fetched successfully", stores });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the store : " + error });
    }
}