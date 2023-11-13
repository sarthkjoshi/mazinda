import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {

    const { userToken } = await req.json();

    // Verify the user's token to get their email
    const userData = jwt.verify(userToken, 'this is jwt secret');

    try {
        await connectDB();

        // Find the user by their email
        let user = await User.findOne({ email: userData.email });

        console.log(user);

        if (user) {
            user.cart = [];
            return NextResponse.json({ success: true, message: "Cart cleared successfully" });
        } else {
            return NextResponse.json({ success: false, error: "User doesn't exist" });
        }
    } catch (err) {
        return NextResponse.json({ success: false, error: "An error occurred while clearing the cart: " + err });
    }
}