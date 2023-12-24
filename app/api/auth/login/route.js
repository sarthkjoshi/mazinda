import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { credentials } = await req.json();
        const { identifier, password } = credentials;

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
            if (!user.password) {
                return NextResponse.json({ success: false, message: "Email already in use" });
            }
            // Decrypting the password and matching it against the user's password
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

            if (password === decryptedPassword) {
                const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, 'this is jwt secret')
                return NextResponse.json({ success: true, message: "Logged in successfully", user_token: token });
            } else {
                return NextResponse.json({ success: false, message: "Invalid credentials" });
            }
        } else {
            return NextResponse.json({ success: false, message: "User doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the user: " + error });
    }
}