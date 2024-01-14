import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req) {
    const { userName, userNumber, amount } = await req.json()

    const message = 
    `Hey ${userName},
    
    Your order from Citikartt has been confirmed and will reach you very soon!

    Please Pay Rs ${amount} through UPI/Cash to the delivery person.
    
    Meanwhile you can see your orders on 
    https://www.citikartt.com/myorders

    Hope you will order again only on www.citikartt.com 

    Thank You!
    `;

    const response = await axios.post(`https://wapp.powerstext.in/api/send?number=91${userNumber}&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`)

    console.log(response.data)

    if (response.data.status === 'success') {
        return NextResponse.json({ status: 200, success: true })
    }

    return NextResponse.json({ status: 400, success: false })

}