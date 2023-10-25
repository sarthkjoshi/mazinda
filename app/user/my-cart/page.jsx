"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [pricing, setPricing] = useState({
    total_mrp: 0,
    total_costPrice: 0,
    service_charge: 0,
    delivery_fees: 0,
    additional_discount: 0,
  });

  const fetchUserCart = async () => {
    const userToken = Cookies.get("user_token");
    if (userToken) {
      const response = await axios.post("/api/user/fetch-user", { userToken });
      setCart(response.data.user.cart);
      fetchPricing(response.data.user.cart);
    } else {
      router.push("/user/auth/login");
    }
  };

  const fetchPricing = (cart) => {
    let total_mrp = 0;
    let total_costPrice = 0;

    cart.forEach((item) => {
      total_mrp += parseFloat(item.mrp) * item.quantity;
      total_costPrice += parseFloat(item.costPrice) * item.quantity;
    });

    console.log(total_mrp);

    setPricing({
      ...pricing,
      total_mrp,
      total_costPrice,
    });
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl">Your Shopping Cart</h1>

      <div>
        {cart.length > 0 &&
          cart.map((item) => {
            return (
              <div
                className="flex mt-3 border rounded-lg h-24 p-2 items-center shadow-md mx-2 relative"
                key={item.productID}
              >
                <div className="border px-2 rounded-full font-bold absolute top-0 right-0 translate-x-2 -translate-y-2 bg-white hover:bg-gray-200">
                  <svg
                    className="w-2 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </div>
                <img className="w-14 h-auto" src={item.imageURI} alt="img" />
                <div className="flex flex-col ml-2">
                  <span className="text-sm font-semibold">
                    {item.productName}
                  </span>
                  <div>Rs {item.costPrice}/-</div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="text-lg border shadow-md p-4 m-2 rounded-xl">
        <div className="flex justify-between w-full">
          <span>Subtotal</span>
          <span>₹{pricing.total_mrp}</span>
        </div>
        <div className="flex justify-between w-full text-green-500 font-bold">
          <span>Discount</span>
          <span>₹{pricing.total_mrp - pricing.total_costPrice}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Service Charge</span>
          <span>₹{pricing.service_charge}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Delivery Fees</span>
          <span>₹{pricing.delivery_fees}</span>
        </div>
        <div className="flex justify-between w-full text-green-500 font-bold">
          <span>Additional Discount</span>
          <span>₹{pricing.additional_discount}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Total</span>
          <span>
            ₹
            {pricing.total_costPrice +
              pricing.delivery_fees +
              pricing.service_charge -
              pricing.additional_discount}
          </span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <button className="absolute bottom-20 bg-[#FE6321] px-10 py-2 rounded-3xl text-white font-bold">
          Continue to Checkout
        </button>
      </div>
    </>
  );
};

export default MyCart;
