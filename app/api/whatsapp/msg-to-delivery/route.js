import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req) {
    // const group_id = '120363193471121815@g.us';
    const { userName, order_id, products, address, amount, vendorName } = await req.json();

    let productsList = "";
    Object.entries(products).forEach(product => {
        productsList += `\n\t${product[0]} - ${product[1]['quantity']}\n`
    });

    const message = 
    `*New Order (id: ${order_id.slice(-4)})*

    *Pickup*: ${vendorName}

    *Products:* \n${productsList}

    *Delivery Location*: 

      *Name*: ${userName}
      *Phone Number*: ${address.phoneNumber}
      *Address*: ${address.hostel}, ${address.campus}

    ${cutleryQuantity > 0 ? `*Cutlery Quantity* : ${cutleryQuantity}` : ""}  
    *Amount*: ${amount}
    `
    const response = await axios.post(`https://wapp.powerstext.in/api/send_group?group_id=120363193471121815@g.us&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`)

    if (response.data.status === 'success') {
        return NextResponse.json({ status: 200, success: true })
    }

    return NextResponse.json({ status: 400, success: false })

}