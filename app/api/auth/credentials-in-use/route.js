import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { phone_number } = await req.json();

    try {
        // Connecting to the database
        await connectDB();

        let user = await User.findOne({ mobileNumber: phone_number });

        if (user) {
            return NextResponse.json({ success: true, usedStatus: true });
        } else {
            return NextResponse.json({ success: true, usedStatus: false });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred: " + error });
    }
}