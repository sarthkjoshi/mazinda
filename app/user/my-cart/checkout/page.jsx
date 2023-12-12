"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import FallingLinesLoader from "@/components/utility/FallingLinesLoader";
import Link from "next/link";
import phonepesvg from "@/public/phonepe-1.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import OvalLoader from "@/components/utility/OvalLoader";
import { useLocation } from "@/contexts/LocationContext";

const CheckoutPage = () => {
  const router = useRouter();

  const [cartLoading, setCartLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const selectedLocation = useLocation();

  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [pricing, setPricing] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showChoosePaymentMethod, setShowChoosePaymentMethod] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const fetchData = async (userToken) => {
    const { data } = await axios.post("/api/user/fetch-user", { userToken });

    const user = data.user;
    const cart = user.cart;
    const pricing = user.pricing;
    const currentAddress = user.currentAddress;

    setUser(user);

    if (cart.length) {
      setCart(cart);
      setPricing(pricing);
      setCartLoading(false);
      if (currentAddress && Object.keys(currentAddress).length > 0) {
        if (
          selectedLocation &&
          selectedLocation.pincodes &&
          selectedLocation.pincodes.includes(currentAddress.pincode)
        ) {
          setShippingAddress(currentAddress);
        } else {
          router.push("/user/my-cart/checkout/shipping-info");
        }
      } else {
        router.push("/user/my-cart/checkout/shipping-info");
      }
    } else {
      router.push("/user/my-cart");
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("user_token");
    if (!userToken) {
      router.push("/user/auth/login");
      return;
    }
    fetchData(userToken);
  }, []);

  const handlePlaceOrder = async () => {
    console.log("here");
    if (!paymentMethod) {
      setShowChoosePaymentMethod(true);
      return;
    }
    try {
      const userToken = Cookies.get("user_token");
      setSubmitting(true);
      const { data } = await axios.post("/api/order/create-order", {
        userToken,
        userCart: cart,
        pricing: user.pricing,
        address: shippingAddress,
        paymentMethod,
      });

      if (data.success) {
        // Clear the cart after placing the order
        await axios.post("/api/user/cart/clear-cart", {
          userToken,
        });

        try {
          await axios.post("/api/whatsapp/msg-to-group");
        } catch (err) {
          console.log(err);
        }

        router.push("/user/my-cart/checkout/success");

        const storeIDs = cart.map((item) => item.storeID);
        let storeMobileNumbers = [];

        for (let store_id of storeIDs) {
          const { data } = await axios.post("/api/store/fetch-store-number", {
            id: store_id,
          });
          storeMobileNumbers.push(data.storeMobileNumber);
        }

        for (let store_mobile_number of storeMobileNumbers) {
          try {
            await axios.post("/api/whatsapp/msg-to-store", {
              store_mobile_number,
            });
            await delay(2000); // 2000 milliseconds = 2 seconds
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        toast.warn(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.warn("Oops.. A network error occurred while placing the order");
      setSubmitting(false);
    }
  };

  const handleOnChange = (e) => {
    setPaymentMethod(e.target.value);
    setShowChoosePaymentMethod(false);
  };

  return (
    <div className="md:w-1/2 lg:w-1/3 md:mx-auto">
      <h1 className="text-center text-2xl mb-3">Checkout</h1>

      <div className="md:mt-10">
        <div>
          {cartLoading ? (
            <FallingLinesLoader />
          ) : (
            cart.length > 0 &&
            cart.map((item) => {
              return (
                <div key={item.productID}>
                  <div className="flex rounded-lg px-2 py-1 items-center mx-2 relative">
                    <img
                      className="w-10 h-auto mr-3"
                      src={item.imagePaths[0]}
                      alt="img"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="text-md">
                        {item.productName.slice(0,40)}...
                      </span>
                      <div>
                        <span className="text-xl">₹ {item.salesPrice}/-</span>
                        <span className="ml-2 text-md text-gray-500">
                          <s>₹ {item.mrp}/-</s>
                        </span>
                        <span className="ml-4 text-lg text-green-600 font-bold">
                          {String(
                            ((item.mrp - item.salesPrice) / item.mrp) * 100
                          ).slice(0, 4)}
                          % off
                        </span>
                        <span className="text-gray-800 font-bold text-lg ml-5">
                          x {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          )}
          <Link
            href="/user/my-cart/checkout/shipping-info"
            className="flex my-2 items-center mx-2 justify-between"
          >
            <span className="text-sm">Shipping To</span>
            <div
              className="mx-1 scale-90 flex items-center"
              key={shippingAddress.id}
            >
              <div>
                <h1 className="text-md">{shippingAddress.name}</h1>
                <div className="text-sm text-gray-600">
                  <p>
                    {shippingAddress.subaddress}
                    <br />
                    {shippingAddress.city}, {shippingAddress.state},{" "}
                    {shippingAddress.pincode}, IN
                  </p>
                </div>
              </div>
              <svg
                className="w-3 h-3 text-gray-800 dark:text-white ml-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
              </svg>
            </div>
          </Link>
          <hr />

          <div className="border p-4 m-2 shadow rounded-lg">
            <h1 className="font-bold mb-1">Billing Details</h1>

            {!cartLoading ? (
              <>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{pricing.total_mrp}</span>
                </div>

                <div className="flex justify-between text-green-500 font-semibold">
                  <span>Discount</span>
                  <span>
                    ₹{parseFloat(pricing.total_mrp - pricing.total_salesPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge</span>
                  <span>₹{pricing.service_charge}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fees</span>
                  <span>₹{pricing.delivery_fees}</span>
                </div>
                <div className="flex justify-between text-green-500 font-semibold">
                  <span>Additional Discount</span>
                  <span>₹{pricing.additional_discount}</span>
                </div>
                <div className="flex justify-between font-extrabold">
                  <span>Total</span>
                  <span>
                    ₹
                    {parseFloat(
                      pricing.total_salesPrice +
                        pricing.service_charge +
                        pricing.delivery_fees -
                        pricing.additional_discount
                    )}
                  </span>
                </div>
              </>
            ) : (
              <OvalLoader />
            )}
          </div>

          {showChoosePaymentMethod && (
            <span className="text-sm px-4 text-red-500">
              Kindly Choose Your Preferred Payment Method
            </span>
          )}
          <div
            className={`border p-4 m-2 shadow rounded-lg ${
              showChoosePaymentMethod ? "border-red-500 bg-red-50" : ""
            }`}
          >
            <h1 className="font-bold mb-1">Payment Details</h1>

            <form>
              <input
                disabled
                className="my-2"
                type="radio"
                name="payment_method"
                value="phonepe"
                onChange={handleOnChange}
              />
              <label htmlFor="phonepe" className="ml-3 text-gray-500">
                Pay With{" "}
                <Image
                  className="inline mb-1 grayscale"
                  src={phonepesvg}
                  alt="PhonePe"
                  width={80}
                />
              </label>
              <br />
              <input
                disabled
                className="my-2"
                type="radio"
                name="payment_method"
                value="card"
                onChange={handleOnChange}
              />
              <label htmlFor="card" className="ml-3 text-gray-500">
                Credit Or Debit Card
              </label>
              <br />
              <input
                className="my-2"
                type="radio"
                name="payment_method"
                value="pod"
                onChange={handleOnChange}
              />
              <label htmlFor="pod" className="ml-3">
                Pay On Delivery/Cash On Delivery
              </label>
            </form>
          </div>

          <div className="hidden md:flex w-full items-center justify-center mt-7">
            <Link
              href="/user/my-cart/checkout"
              className={`px-10 py-2 rounded-lg text-white font-bold hover:opacity-75 w-full text-center ${
                submitting ? "bg-gray-300" : "bg-black"
              }`}
              onClick={handlePlaceOrder}
            >
              {submitting ? "Placing Your Order..." : "Place Order"}
            </Link>
          </div>

          <div className="w-full flex items-center justify-center md:hidden">
            <Link
              href="/user/my-cart/checkout"
              className={`px-10 py-2 rounded-3xl text-white font-bold hover:opacity-75 mb-20 mt-3 transition-all duration-300 ${
                submitting ? "bg-gray-300" : "bg-[#FE6321]"
              }`}
              onClick={handlePlaceOrder}
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
