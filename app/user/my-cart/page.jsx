"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "react-toastify";

import Image from "next/image";
import empty_cart_img from "@/public/empty_cart.png";

import { fetchUserCart, removeItemFromCart } from "@/utils/cart";

import FallingLinesLoader from "@/components/Loading-Spinners/FallingLinesLoader";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const [pricing, setPricing] = useState({
    total_mrp: 0,
    total_salesPrice: 0,
    total_costPrice: 0,
    service_charge: 0,
    delivery_fees: 0,
    additional_discount: 0,
  });

  const UpdateItemInCart = async (item, filter) => {
    const userToken = Cookies.get("user_token");

    if (userToken) {
      try {
        const { data } = await axios.post(
          `/api/user/cart/add-update-item?filter=${filter}`,
          {
            itemInfo: {
              productID: item.productID,
            },
            userToken,
          }
        );
        if (data.success) {
          setCart(data.cart);
        }
      } catch (err) {
        console.log("An error occurred", err);
      }
    } else {
      toast({
        title: "New to Mazinda?",
        description:
          "Signup/Login now to customize your cart and experience shopping like never before!",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => router.push("/user/auth/login")}
          >
            Login
          </ToastAction>
        ),
      });
    }
  };

  const fetchPricing = (cart) => {
    let total_mrp = 0;
    let total_salesPrice = 0;
    let total_costPrice = 0;

    if (cart) {
      cart.forEach((item) => {
        total_mrp += parseFloat((item.mrp).replace(',', '')) * item.quantity;
        total_salesPrice += parseFloat(item.salesPrice) * item.quantity;
        total_costPrice += parseFloat(item.costPrice) * item.quantity;
      });
    }

    setPricing({
      ...pricing,
      total_mrp,
      total_salesPrice,
      total_costPrice,
    });
  };

  useEffect(() => {
    const fetchedUserToken = Cookies.get("user_token");
    setUserToken(fetchedUserToken);

    const fetchData = async () => {
      const cart = await fetchUserCart(fetchedUserToken);
      setCart(cart);
      setCartLoading(false);
      fetchPricing(cart);
      setPageLoading(false);
    };
    fetchData();
  }, []);

  if (pageLoading) {
    return (
      <div className="md:w-1/2 lg:w-1/3 md:mx-auto">
        <h1 className="text-center text-2xl md:mb-10">Your Shopping Cart</h1>
        <div className="px-5 py-3">
          <Skeleton className="w-full my-3 h-[96px] md:w-[488px] md:h-[96px] md:my-2 rounded-lg" />
          <Skeleton className="w-full my-3 h-[178px] md:w-[488px] md:h-[178px] md:my-2 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="md:w-1/2 lg:w-1/3 md:mx-auto">
      <h1 className="text-center text-2xl md:mb-10">Your Shopping Cart</h1>

      <div>
        {cart && cart.length > 0 ? (
          <>
            <div className="px-2 md:px-0">
              <div>
                {cartLoading ? (
                  <FallingLinesLoader />
                ) : (
                  cart.length > 0 &&
                  cart.map((item) => {
                    return (
                      <div
                        className="flex mt-3 border rounded-lg h-24 p-2 items-center shadow-md mx-2 relative"
                        key={item.productID}
                      >
                        {/* Remove From Cart Button */}
                        <div
                          className="border px-2 rounded-full font-bold absolute top-0 right-0 translate-x-2 -translate-y-2 bg-white hover:bg-gray-200"
                          onClick={async () => {
                            const newCart = await removeItemFromCart(
                              userToken,
                              item.productID
                            );
                            if (newCart) {
                              setCart(newCart);
                              if (newCart.length) {
                                fetchPricing(newCart);
                              }
                            } else {
                              toast.error("Oops! Something went wrong");
                            }
                          }}
                        >
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

                        <img
                          className="w-14 h-auto mr-2"
                          src={item.imagePaths[0]}
                          alt="img"
                        />

                        <div className="flex flex-col ml-2 w-full">
                          <span className="text-sm font-semibold">
                            {item.productName.slice(0, 60)}...
                          </span>

                          <div className="flex justify-between">
                            <div className="text-gray-600">
                              Rs {item.salesPrice}/-
                            </div>
                            <div className="flex items-center bg-white rounded-3xl mx-1 border border-[#F17E13]">
                              <button
                                onClick={() => {
                                  UpdateItemInCart(item, "decrement");
                                }}
                                className="bg-[#f17e13] text-white px-2 rounded-l-full"
                              >
                                -
                              </button>
                              <span className="px-2">
                                {
                                  cart.find(
                                    (product) =>
                                      product.productID === item.productID
                                  )?.quantity
                                }
                              </span>
                              <button
                                onClick={() => {
                                  UpdateItemInCart(item, "increment");
                                }}
                                className="bg-[#f17e13] text-white rounded-r-3xl px-2"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="text-md border shadow-md p-4 m-2 rounded-xl">
                <div className="flex justify-between w-full">
                  <span>Subtotal</span>
                  <span>₹{pricing.total_mrp}</span>
                </div>
                <div className="flex justify-between w-full text-green-500 font-bold">
                  <span>Discount</span>
                  <span>₹{pricing.total_mrp - pricing.total_salesPrice}</span>
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
                    {pricing.total_salesPrice +
                      pricing.delivery_fees +
                      pricing.service_charge -
                      pricing.additional_discount}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex w-full items-center justify-center mt-7">
              <Link
                href="/user/my-cart/checkout"
                className="bg-black px-10 py-2 rounded-lg text-white font-bold hover:opacity-75 w-full text-center"
              >
                Continue to Checkout
              </Link>
            </div>

            <div className="w-full flex items-center justify-center md:hidden">
              <Link
                href="/user/my-cart/checkout"
                className="absolute bottom-20 bg-[#FE6321] px-10 py-2 rounded-3xl text-white font-bold hover:opacity-75"
              >
                Continue to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Image src={empty_cart_img} alt="" />
            <h1 className="text-xl">Your Shopping Cart Is Empty</h1>
            <h4 className="text-sm text-gray-500 text-center mt-3">
              Your cart looks empty, time to fill it with some amazing finds!
            </h4>
            <Link
              href="/"
              className="font-semibold bg-[#F17E13] text-white px-7 py-1 rounded-full shadow flex items-center justify-center mt-3 cursor-pointer hover:opacity-75"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;
