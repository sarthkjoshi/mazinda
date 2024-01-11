import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  // const {  } = await req.json()

  const message = `New Order On Mazinda!`;

  const { data } = await axios.post(
    `https://wapp.powerstext.in/api/send_group?group_id=120363218361761258@g.us&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`
  );

  if (data.status === "success") {
    return NextResponse.json({ status: 200, success: true });
  }

  return NextResponse.json({ status: 400, success: false, response });
}
