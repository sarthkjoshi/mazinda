import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req) {

    const { phone } = await req.json();

    const sender_id = 'TXXTOO';
    const apikey = 'PGQVweSwfUsoIuKn';

    const response = await axios.post(`http://bulksms.thetechmore.in/vb/apikey.php?apikey=${apikey}&senderid=${sender_id}&number=${phone}&templateid=${template_id}&message=Dear%20User%2C%0AYour%20order%20has%20been%20confirmed.%20Please%20check%20the%20details%20on%20the%20app.%0ACitikartt.com%2FVendor%0AText2`)

    console.log(response.data)

    if (response.data.status === 'Success') {
        return NextResponse.json({ status: 200, success: true })
    }

    return NextResponse.json({ status: 400, success: false })

}