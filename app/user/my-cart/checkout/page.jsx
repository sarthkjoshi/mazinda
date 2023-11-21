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

  const fetchData = async (userToken) => {
    const response = await axios.post("/api/user/fetch-user", { userToken });

    const user = response.data.user;
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
    if (!paymentMethod) {
      setShowChoosePaymentMethod(true);
      return;
    }
    try {
      const userToken = Cookies.get("user_token");
      setSubmitting(true);
      const response = await axios.post("/api/order/create-order", {
        userToken,
        storeId: cart[0]["storeID"],
        userCart: cart,
        pricing: user.pricing,
        address: shippingAddress,
        paymentMethod,
      });

      if (response.data.success) {
        // Clear the cart after placing the order
        const response = await axios.post("/api/user/cart/clear-cart", {
          userToken,
        });
        console.log(response);
        router.push("/user/my-cart/checkout/success");
      } else {
        toast.warn(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.warn("Oops.. A network error occurred while placing the order");
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
                className="w-3 h-3 text-gray-800 dark:text-white"
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
              Place Order
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
