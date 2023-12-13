import Location from "@/models/Location";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
        let locations = await Location.find();
        return NextResponse.json({ success: true, locations });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the Locations : " + error });
    }
}