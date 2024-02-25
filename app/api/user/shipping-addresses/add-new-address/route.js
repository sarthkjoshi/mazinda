import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';

export async function POST(req) {
    try {
        const { newAddress, userToken } = await req.json();
        const userData = jwt.verify(userToken, 'this is jwt secret');

        // Connecting to the database
        await connectDB()

        // Checking if the user already exists with either email or phone number
        const user = await User.findOne({ phoneNumber: userData.phoneNumber });

        if (user) {
            let savedAddresses = user.savedAddresses;
            let randrom_id = cryptoRandomString({
                length: 10,
                type: 'alphanumeric'
            });

            savedAddresses.push({
                ...newAddress, id: randrom_id
            });
            user.savedAddresses = savedAddresses;

            await user.save();
            return NextResponse.json({ success: true, message: "New address added successfully", newSavedAddresses: savedAddresses, newAddress_id:{...newAddress, id: randrom_id}});
        } else {
            return NextResponse.json({ success: false, message: "User does not exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the user: " + error });
    }
}