import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {

    const { itemInfo, userToken } = await req.json();

    console.log(itemInfo);

    // Verify the user's token to get their email
    const userData = jwt.verify(userToken, 'this is jwt secret');

    try {
        await connectDB();

        // Find the user by their email
        let user = await User.findOne({ email: userData.email });

        if (user) {
            // If the product is not in the cart, add it with a quantity of 1
            user.cart = [{
                productID: itemInfo._id,
                productName: itemInfo.productName,
                quantity: 1,
                imagePaths: itemInfo.imagePaths,
                storeID: itemInfo.storeId,
                costPrice: itemInfo.pricing.costPrice,
                salesPrice: itemInfo.pricing.salesPrice,
                mrp: itemInfo.pricing.mrp,
            }];

            // Save the updated user data
            await user.save();

            return NextResponse.json({ success: true, message: "Item added successfully" });
        } else {
            return NextResponse.json({ success: false, error: "User doesn't exist" });
        }
    } catch (err) {
        return NextResponse.json({ success: false, error: "An error occurred while updating the cart: " + err });
    }
}
