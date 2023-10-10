import Store from "@/models/Store";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

// import CryptoJS from "crypto-js";

export async function POST(req) {
    try {
        const { formData } = await req.json();
        const { ownerName, storeName, address, city, pincode, mobileNumber, alternateMobileNumber, email, password } = formData;
        await connectDB()
        let store = await Store.findOne({ mobileNumber })

        if (!store) {
            await Store.create({ ownerName, storeName, mobileNumber, alternateMobileNumber, email, password, storeAddress: { address, city, pincode } });
            // await Vendor.create({ name, number, alternateNumber, password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(), deliveryLocations, deliveryCharges, foodTypes });
            return NextResponse.json({ success: true, message: "Store created successfully" });
        }

        else {
            return NextResponse.json({ success: false, message: "Store already exists" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the Store : " + error });
    }
}