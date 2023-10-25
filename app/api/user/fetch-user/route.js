import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { userToken } = await req.json();
        const userData = jwt.verify(userToken, 'this is jwt secret');

        // Connecting to the database
        await connectDB()

        // Checking if the user already exists with either email or phone number
        const user = await User.findOne({ email: userData.email });

        if (user) {
            return NextResponse.json({ success: true, message: "User fetched successfully", user });
        } else {
            return NextResponse.json({ success: false, message: "User does not exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the user: " + error });
    }
}