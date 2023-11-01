import connectDB from "@/libs/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { categoryName } = await req.json();
    try {
        await connectDB()
        const categoryProducts = await Product.find({ category: categoryName })
        if (!categoryProducts) {
            return NextResponse.json({ success: false, error: "Products doesn't exist" + error });
        }
        return NextResponse.json({ success: true, categoryProducts });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the Product : " + error });
    }
}