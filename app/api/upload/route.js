import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucketName = 'mazinda-bucket';

    try {

        const s3 = new AWS.S3();

        const params = {
            Bucket : bucketName,
            Key: file.name,
            Body: buffer,
        }

        let file_location;

        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return NextResponse.json({ success: false });
            } else {
                file_location = data.Location;
                console.log("file uploaded successfully", data.Location)
            }
        });
        return NextResponse.json({ success: true, fileName: file.name, location: data.Location });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, error: 'Error uploading file' });
    }
}