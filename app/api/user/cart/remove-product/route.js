import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {

    const { productID, userToken } = await req.json();

    // Verify the user's token to get their email
    const userData = jwt.verify(userToken, 'this is jwt secret');

    try {
        await connectDB();

        // Find the user by their email
        let user = await User.findOne({ email: userData.email });

        if (user) {
            // Check if the product is already in the cart
            const existingCartItem = user.cart.find(item => item.productID === productID);

            if (existingCartItem) {
                // If the product is in the cart, remove it 
                const newCart = user.cart.filter(item => item.productID !== productID); // New cart without that product
                user.cart = newCart;

                await user.save();

                return NextResponse.json({ success: true, message: "Item deleted successfully", newCart });

            } else {
                // If the product is not in the cart, return
                return NextResponse.json({ success: false, error: "Item doesn't exist in cart" });
            }

        } else {
            return NextResponse.json({ success: false, error: "User doesn't exist" });
        }
    } catch (err) {
        return NextResponse.json({ success: false, error: "An error occurred while updating the cart: " + err });
    }
}
