import Store from "@/models/Store";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { id } = await req.json();

        // Connecting to database
        await connectDB();

        // Checking if the Vendor already exists
        let store = await Store.findById(id).select('mobileNumber');

        if (store) {
            return NextResponse.json({ success: true, message: "Store mobile number fetched successfully", storeMobileNumber: store.mobileNumber });
        } else {
            return NextResponse.json({ success: false, message: "Store doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the store : " + error });
    }
}