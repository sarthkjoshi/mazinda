import Product from "@/models/Product";
import Store from "@/models/Store";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { availablePincodes } = await req.json();
    try {
        await connectDB();

        // Find stores with matching pincodes
        const stores = await Store.find({ 'storeAddress.pincode': { $in: availablePincodes } });

        // Extract storeIds from the matching stores
        const storeIds = stores.map(store => store._id);

        // Find products belonging to the matching stores
        let products = await Product.find({
            topDeal: true,
            approvalStatus: true,
            storeId: { $in: storeIds },
        });

        return NextResponse.json({ success: true, products });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the Product: " + error });
    }
}