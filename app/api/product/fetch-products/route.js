import Product from "@/models/Product";
import Store from "@/models/Store";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const searchParams = request.nextUrl.searchParams
    const filter = searchParams.get('filter');
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('searchQuery');

    try {
        await connectDB();

        let products;

        if (filter) {
            const { availablePincodes } = await request.json();
            // Find stores with matching pincodes
            const stores = await Store.find({ 'storeAddress.pincode': { $in: availablePincodes } });
            // Extract storeIds from the matching stores
            const storeIds = stores.map(store => store._id);
            switch (filter) {
                case "top-deal":
                    // Find products belonging to the matching stores
                    products = await Product.find({
                        topDeal: true,
                        approvalStatus: true,
                        storeId: { $in: storeIds },
                    });

                    break;
                case "trending":
                    // Find products belonging to the matching stores
                    products = await Product.find({
                        trending: true,
                        approvalStatus: true,
                        storeId: { $in: storeIds },
                    });

                    break;
            }
        }

        else if (category) {
            const { availablePincodes } = await request.json();

            const stores = await Store.find({ 'storeAddress.pincode': { $in: availablePincodes } });
            
            const storeIds = stores.map(store => store._id);
            products = await Product.find({ category, approvalStatus: true, storeId: { $in: storeIds }, })
        }

        else if (searchQuery) {
            const { availablePincodes } = await request.json();
            const stores = await Store.find({ 'storeAddress.pincode': { $in: availablePincodes } });

            // Extract storeIds from the matching stores
            const storeIds = stores.map(store => store._id);

            // Fetch products based on approvalStatus and storeIds
            products = await Product.find({
                approvalStatus: true,
                storeId: { $in: storeIds },
            }).exec();


            const lowercaseSearchQuery = searchQuery.toLowerCase();

            // const products = await Product.find({ approvalStatus: true }).exec();

            // Create two arrays to store products matching in 'productName' and 'description'
            const matchingName = [];
            // const matchingDescription = [];

            products.forEach(product => {
                const productNameLower = product.productName.toLowerCase();
                // const descriptionLower = product.description.toLowerCase();

                if (productNameLower.includes(lowercaseSearchQuery)) {
                    matchingName.push(product);
                }
                // else if (descriptionLower.includes(lowercaseSearchQuery)) {
                //     matchingDescription.push(product);
                // }
            });

            // Combine results with products from 'productName' appearing first
            // const filteredProducts = matchingName.concat(matchingDescription);
            const filteredProducts = matchingName;
            products = filteredProducts;
        }

        return NextResponse.json({ success: true, products });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the Product: " + error });
    }
}