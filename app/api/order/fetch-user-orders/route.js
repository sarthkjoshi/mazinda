import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import Order from "@/models/Order";

export async function POST(req) {
    try {
        const { userToken, filter } = await req.json();

        const userData = jwt.verify(userToken, 'this is jwt secret');

        await connectDB()

        let user = await User.findOne({ email: userData.email })
        if (!user) {
            return NextResponse.json({ success: false, error: "User doesn't exists" });
        }

        let orders;

        if (filter === 'delivered') {
            orders = await Order.find({ isDelivered: true });
        } else if (filter === 'active') {
            orders = await Order.find({ isDelivered: false });
        } else {
            orders = await Order.find();
        }

        return NextResponse.json({ success: true, message: "Current orders fetched successfully", orders });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the products : " + error });
    }
}