import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(req) {
    const { message } = await req.json()
    try {
        const html =
            `
            <p>${message}</p>
            `

        await sendEmail("rachit@mazinda.com", "New Query | Mazinda", html)
        return NextResponse.json({ status: 200, success: true, message: "Email sent successfully" })
    } catch (e) {
        console.log("An error occurred : " + e)
        return NextResponse.json({ status: 500, success: false, message: "Something went wrong, please try again later" })
    }

}