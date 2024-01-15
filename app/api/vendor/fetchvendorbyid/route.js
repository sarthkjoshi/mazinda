// import Vendor from "@/models/Vendor";
import VendorSchema from "@/models/Vendor";
// import connectCityDB from "@/lib/foodmongoose";
const db = require("@/lib/foodmongoose");
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const connectCityDB = db();
        // console.log("here"+connectCityDB);
        const Vendor = connectCityDB.model("Vendor",VendorSchema);

        const { _id } = await req.json();

        // Connecting to database
        // await connectCityDB()

        // Checking if the Vendor already exists
        let vendor = await Vendor.findById(_id).select('-password -number -alternateNumber');

        if (vendor) {
            return NextResponse.json({ success: true, message: "Vendor fetched successfully", vendor });
        } else {
            return NextResponse.json({ success: false, message: "Vendor doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the vendor : " + error });
    }
}