import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req) {
    const { store_mobile_number } = await req.json();

    const message =
    `New Order At Mazinda\n\n

    Check on store.mazinda.com
    `;

    const response = await axios.post(`https://wapp.powerstext.in/api/send?number=91${store_mobile_number}&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`)

    console.log(response.data)

    if (response.data.status === 'success') {
        return NextResponse.json({ status: 200, success: true })
    }

    return NextResponse.json({ status: 400, success: false })

}