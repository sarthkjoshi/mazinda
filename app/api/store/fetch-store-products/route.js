import Product from "@/models/Product";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { storeId } = await req.json();

        // Connecting to database
        await connectDB();
       
        // Checking if the Vendor already exists
        let products = await Product.find({
            approvalStatus: true,
            storeId: storeId,
        });

        if (products) {
            return NextResponse.json({ success: true, message: "Store's Products fetched successfully", products });
        } else {
            return NextResponse.json({ success: false, message: "Store's Products doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the Store's Products : " + error });
    }
}