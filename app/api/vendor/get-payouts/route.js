import Vendor from "@/models/Vendor";
import connectCityDB from "@/lib/foodmongoose";
import { NextResponse } from "next/server";

const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = ('0' + date.getUTCDate()).slice(-2);
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear();

    const formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
}

export async function POST(req) {
    try {
        let { vendorId, orderId, totalAmount, payPercentage, handlingCharge, serviceCharge, externalDeliveryRequired, deliveryCharge, orderCreatedAt } = await req.json();

        handlingCharge = parseFloat(handlingCharge)
        serviceCharge = parseFloat(serviceCharge)

        // const { vendorId, orderId, totalAmount, payPercentage, handlingCharge, serviceCharge, externalDeliveryRequired, cutleryQuantity, deliveryCharge, orderCreatedAt } = await req.json();

        let cutleryQuantity = 0;

        const orderDate = getDateFromTimestamp(orderCreatedAt);

        await connectCityDB();

        let vendor = await Vendor.findById(vendorId);

        if (vendor) {
            let vendorPayouts = vendor.payouts || {}; // Initialize if undefined

            let dates = Object.keys(vendorPayouts);

            const finalVendorAmount = externalDeliveryRequired
                ?
                parseFloat(payPercentage * (parseFloat(totalAmount - deliveryCharge - serviceCharge - handlingCharge - (cutleryQuantity * 5)) / 100))
                :
                parseFloat(((payPercentage * parseFloat(totalAmount - deliveryCharge - serviceCharge - handlingCharge - (cutleryQuantity * 5))) / 100) + deliveryCharge);


            console.log(finalVendorAmount)

            if (dates.includes(orderDate)) {
                vendorPayouts[orderDate].push({
                    orderId,
                    totalAmount,
                    payPercentage,
                    handlingCharge,
                    serviceCharge,
                    externalDeliveryRequired,
                    cutleryQuantity,
                    deliveryCharge,
                    finalVendorAmount
                });
            } else {
                vendorPayouts[orderDate] = [{
                    orderId,
                    totalAmount,
                    payPercentage,
                    handlingCharge,
                    serviceCharge,
                    externalDeliveryRequired,
                    cutleryQuantity,
                    deliveryCharge,
                    finalVendorAmount
                }];
            }

            return NextResponse.json({ success: true, message: "Vendor payouts updated successfully", payouts: vendorPayouts });
        } else {
            return NextResponse.json({ success: false, message: "Vendor doesn't exist" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred in getting payouts : " + error });
    }
}