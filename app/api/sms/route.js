import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { phone, otp } = await req.json();

  const sender_id = "TXXTOO";
  const apikey = "PGQVweSwfUsoIuKn";
  const template_id = "1607100000000295088";

  const message = `${otp} is the verification code to log in to your Mazinda account. DO NOT share this code with anyone.

    Thanks,
    mazinda.com Text2`;

  const { data } = await axios.post(
    `http://bulksms.thetechmore.in/vb/apikey.php?apikey=${apikey}&senderid=${sender_id}&number=${phone}&templateid=${template_id}&message=${message}`
  );

  console.log(data);

  if (data.status === "Success") {
    return NextResponse.json({ status: 200, success: true });
  }

  return NextResponse.json({ status: 400, success: false });
}
