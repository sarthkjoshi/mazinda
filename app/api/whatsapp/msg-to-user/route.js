import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { userName, userNumber, amount } = await req.json();

  const message = `Hey ${userName},
    
    Your order from Mazinda has been confirmed and will reach you very soon!

    Please Pay Rs ${amount} through UPI/Cash to the delivery person.
    
    Meanwhile you can see your orders on the app.

    Hope you will order again only on Mazinda

    Thank You!
    `;

  const { data } = await axios.post(
    `https://wapp.powerstext.in/api/send?number=91${userNumber}&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`
  );

  // console.log(data)

  if (data.status === "success") {
    return NextResponse.json({ status: 200, success: true });
  }

  return NextResponse.json({ status: 400, success: false });
}
