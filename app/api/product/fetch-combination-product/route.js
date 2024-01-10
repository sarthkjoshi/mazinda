import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { variantId, combinationName } = await request.json();
  try {
    await connectDB();
    const product = await Product.findOne({ variantId, combinationName });
    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product doesn't exist" + error,
      });
    }
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while logging in the Product : " + error,
    });
  }
}
