import Product from "@/models/Product";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { productData } = await req.json();
        const { productName, storeToken, category, pricing, description } = productData;

        await connectDB()
        let product = await Product.findOne({ storeToken, productName })

        if (!product) {
            await Product.create({ productName, storeToken, category, pricing, description });

            return NextResponse.json({ success: true, message: "Product created successfully" });
        }

        else {
            return NextResponse.json({ success: false, message: "Product already exists" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the Product : " + error });
    }
}