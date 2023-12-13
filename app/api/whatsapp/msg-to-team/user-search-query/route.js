import { NextResponse } from "next/server";
import axios from 'axios';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { search_query, userToken } = await req.json();

    const userData = jwt.verify(userToken, 'this is jwt secret');

    const user_details = JSON.stringify(userData, null, '\n');

    const message = `
        New search report by user`+ '\n' + `

        Search Query: ${search_query}` + '\n' + `
        `+ '\n' + `
        User Details: `+ '\n' + user_details;

    const { data } = await axios.post(`https://wapp.powerstext.in/api/send_group?group_id=120363189791988254@g.us&type=text&message=${message}&instance_id=6534CC8282DA7&access_token=65338e1dbc831`);

    if (data.status === 'success') {
        return NextResponse.json({ status: 200, success: true });
    }

    return NextResponse.json({ status: 400, success: false, response: data });
}