import Vendor from "@/models/Vendor";
import connectCityDB from "@/lib/foodmongoose";
import { NextResponse } from "next/server";

export async function POST() {
    try {
    
        await connectCityDB()
    
        let vendors = await Vendor.find().select('-password -number -alternateNumber -menu -whatsapp_group_id -payouts -payPercentage');
        // console.log("vendors"+vendors);
        // console.log("Hello");
        return NextResponse.json({success: true, vendors});
    } catch (error) {
        return NextResponse.json({success: false, error: "An error occurred while fetching vendors."+error });
    }
}