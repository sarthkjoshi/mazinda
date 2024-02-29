import DeleteAccountRequest from "@/models/DeleteAccountRequest";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { userId } = await req.json();

    await DeleteAccountRequest.create({ userId });

    return NextResponse.json({
      success: true,
      message: "Request for deleting account created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        "An error occurred while creating the request for deleting account: " +
        error,
    });
  }
}
