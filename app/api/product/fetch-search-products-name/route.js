import Product from "@/models/Product";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { searchQuery } = await req.json();
    
    try {
        await connectDB();

        const lowercaseSearchQuery = searchQuery.toLowerCase();

        const products = await Product.find({ approvalStatus: true }).select('productName description').exec();

        // Create two arrays to store products matching in 'productName' and 'description'
        const matchingName = [];
        const matchingDescription = [];

        products.forEach(product => {
            const productNameLower = product.productName.toLowerCase();
            const descriptionLower = product.description.toLowerCase();

            if (productNameLower.includes(lowercaseSearchQuery)) {
                matchingName.push(product);
            } else if (descriptionLower.includes(lowercaseSearchQuery)) {
                matchingDescription.push(product);
            }
        });

        // Combine results with products from 'productName' appearing first
        const filteredProducts = matchingName.concat(matchingDescription);

        return NextResponse.json({ success: true, products: filteredProducts });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching products: " + error });
    }
}