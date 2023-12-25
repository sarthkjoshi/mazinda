import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req) {
    const { phone_number, message } = await req.json();

    const response = await axios.post(`https://wapp.powerstext.in/api/send?number=91${phone_number}&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`)

    console.log(response.data);

    if (response.data.status === 'success') {
        return NextResponse.json({ status: 200, success: true })
    }

    return NextResponse.json({ status: 400, success: false })

}