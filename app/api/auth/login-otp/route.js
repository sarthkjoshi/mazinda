import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { identifier } = await req.json();

        // Connecting to the database
        await connectDB()

        // Checking if the user already exists with either email or phone number
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { phoneNumber: identifier }
            ]
        });

        if (user) {
            const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, 'this is jwt secret')
            return NextResponse.json({ success: true, message: "Logged in successfully", user_token: token });
        } else {
            return NextResponse.json({ success: false, message: "User doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the user: " + error });
    }
}