import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id');
    try {
        await connectDB()
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, error: "Product doesn't exist" + error });
        }
        return NextResponse.json({ success: true, product });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while logging in the Product : " + error });
    }
}