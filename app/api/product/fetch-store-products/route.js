import Store from "@/models/Store";
import Product from "@/models/Product";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { storeId } = await req.json();

        // Connecting to database
        await connectDB();

        // Checking if the Store exists
        let store = await Store.findById(storeId).select('-mobileNumber -alternateMobileNumber -password')

        if (store) {
            // Fetching products with the specified storeId
            let products = await Product.find({ storeId });

            return NextResponse.json({ success: true, message: "Products of the store fetched successfully", products });
        } else {
            return NextResponse.json({ success: false, message: "Store doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the store and products: " + error });
    }
}
