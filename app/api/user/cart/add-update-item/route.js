import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { itemInfo, userToken } = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter');

    // Verify the user's token to get their email
    const userData = jwt.verify(userToken, 'this is jwt secret');

    try {
        await connectDB();

        // Find the user by their email
        let user = await User.findOne({ email: userData.email });

        if (user) {
            // Check if the product is already in the cart
            const existingCartItem = user.cart.find(item => item.productID === itemInfo.productID);

            if (existingCartItem) {
                // If the product is in the cart, increment its quantity by 1
                switch (filter) {
                    case 'increment':
                        existingCartItem.quantity += 1;
                        break;
                    case 'decrement':
                        if (existingCartItem.quantity === 1) {
                            const newCart = user.cart.filter(item => item.productID !== existingCartItem.productID);
                            user.cart = newCart;
                        }
                        else {
                            existingCartItem.quantity -= 1;
                        }
                        break;
                    default:
                        break;
                }
                user.markModified('cart');
            } else {
                // If the product is not in the cart, add it with a quantity of 1
                user.cart.push({
                    productID: itemInfo.productID,
                    productName: itemInfo.productName,
                    quantity: 1,
                    imagePaths: itemInfo.imagePaths,
                    storeID: itemInfo.storeID,
                    costPrice: itemInfo.costPrice,
                    salesPrice: itemInfo.salesPrice,
                    mrp: itemInfo.mrp,
                });
            }

            // Save the updated user data
            await user.save();

            return NextResponse.json({ success: true, message: "Cart updated successfully", cart: user.cart });
        } else {
            return NextResponse.json({ success: false, error: "User doesn't exist" });
        }
    } catch (err) {
        return NextResponse.json({ success: false, error: "An error occurred while updating the cart: " + err });
    }
}