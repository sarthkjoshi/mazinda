import Store from "@/models/Store";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { storeId, userId } = await req.json();

        // Connecting to database
        await connectDB();

        // Checking if the Vendor already exists
        let store = await Store.findById(storeId)

        if (store) {
            let updatedFollowers;

            if (store.followers.includes(userId)) {
                updatedFollowers = store.followers.filter(followerId => followerId !== userId);
            } else {
                updatedFollowers = [...store.followers, userId];
            }
            store.followers = updatedFollowers;
            await store.save();

            return NextResponse.json({ success: true, message: "Store followers updated successfully" });
        } else {
            return NextResponse.json({ success: false, message: "Store doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the store : " + error });
    }
}