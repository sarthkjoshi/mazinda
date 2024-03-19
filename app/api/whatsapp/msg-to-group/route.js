// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req) {
//   // const {  } = await req.json()

//   const message = `New Order On Mazinda!`;

//   const { data } = await axios.post(
//     `https://wapp.powerstext.in/api/send_group?group_id=120363218361761258@g.us&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`
//   );

//   if (data.status === "success") {
//     return NextResponse.json({ status: 200, success: true });
//   }

//   return NextResponse.json({ status: 400, success: false, response });
// }

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const {
    group_id,
    order_id,
    // user,
    address,
    products,
    instructions,
    amount,
    externalDeliveryRequired,
  } = await req.json();

  let productsList = "";
  Object.entries(products).forEach((product) => {
    productsList += `\n\t${product[0]} - ${product[1]["quantity"]}\n`;
  });
  const message =
    `New Order At Mazinda. Check on www.vendor.mazinda.com

*Order ID:* ${order_id.slice(-4)}\n
*Products:* \n${productsList}` +
    (externalDeliveryRequired
      ? ""
      : `
    *Address:* ${address.hostel}, ${address.campus}
    *Phone Number:* ${address.phoneNumber}`) +
    `\n*Instructions:* ${instructions}\n` +
    (externalDeliveryRequired ? "" : `\n*Amount*: ${amount}`);

  const response = await axios.post(
    `https://wapp.powerstext.in/api/send_group?group_id=${group_id}&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`
  );

  if (response.data.status === "success") {
    return NextResponse.json({ status: 200, success: true });
  }

  return NextResponse.json({ status: 400, success: false, response });
}
