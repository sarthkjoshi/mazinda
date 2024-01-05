"use client";

import MagnifyingLoader from "@/components/loading-spinners/MagnifyingLoader";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Order = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/order/fetch-order-by-id", {
        id: order_id,
      });

      console.log(response.data.order);
      setOrder(response.data.order);
      setLoading(false);
    } catch (err) {
      toast.info("Network Error");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="md:w-1/2 lg:w-1/3 mx-auto px-2 mb-20">
      <h1 className="text-center text-2xl md:mb-10">Your Order</h1>
      {!loading ? (
        <>
          <div className="mt-3">
            {order.cart.length > 0 &&
              order.cart.map((item) => {
                return (
                  <Link
                    href={`/product/view-product?id=${item.productID}`}
                    key={item.productID}
                  >
                    <div className="flex rounded-lg px-2 py-1 items-center mx-2 relative">
                      <img
                        className="w-14 h-auto"
                        src={item.imagePaths[0]}
                        alt="img"
                      />
                      <div className="flex flex-col ml-2">
                        <span className="text-sm font-semibold">
                          {item.productName}
                        </span>
                        <div className="text-gray-600">
                          Rs {item.salesPrice}/-
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Link>
                );
              })}
          </div>

          <div className="p-3">
            <span className="font-bold">Live Status</span> -{" "}
            <span className="text-green-500 font-bold">{order.status}</span>
          </div>

          <hr />

          <div className="p-3">
            <h1 className="font-bold">Shipping Details</h1>
            <span className="text-sm text-gray-700">
              To - {order.address.name}
            </span>
            <br />
            <span className="text-sm text-gray-700">
              {order.address.subaddress}, {order.address.city}
            </span>
            <br />
            <span className="text-sm text-gray-700">
              {order.address.state}, {order.address.pincode}, IN
            </span>
            <br />
          </div>

          <div className="p-3 mt-1">
            <span>Delivery by Mazinda</span>
            <br />
            <span className="text-sm text-gray-600">
              Order ID: {order._id.slice(-5)}
            </span>
          </div>
          <hr />

          <div className="p-3">
            {/* <h1 className="font-bold">Invoice</h1> */}
            <div>
              <div className="flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span>₹{order.pricing.total_mrp} /-</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>
                  - ₹
                  {parseFloat(
                    order.pricing.total_mrp - order.pricing.total_salesPrice
                  )}{" "}
                  /-
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge</span>
                <span>₹{order.pricing.service_charge} /-</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fees</span>
                <span>₹{order.pricing.delivery_fees} /-</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{order.pricing.total_salesPrice} /-</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center mt-5">
          <MagnifyingLoader />
        </div>
      )}
    </div>
  );
};

export default Order;
