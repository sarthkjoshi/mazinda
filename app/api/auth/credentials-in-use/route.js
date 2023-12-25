import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, phone_number } = await req.json();

    try {
        // Connecting to the database
        await connectDB();

        const userByEmail = await User.findOne({ email });
        const userByPhoneNumber = await User.findOne({ mobileNumber: phone_number });

        if (userByEmail && userByPhoneNumber) {
            return NextResponse.json({ success: true, usedStatus: true, message: 'User already exists' });
        } else if (userByEmail) {
            return NextResponse.json({ success: true, usedStatus: true, message: 'Email already associated with another account' });
        } else if (userByPhoneNumber) {
            return NextResponse.json({ success: true, usedStatus: "phone_number", message: 'Phone Number already associated with another account' });
        } else {
            return NextResponse.json({ success: true, usedStatus: false });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred: " + error });
    }
}
