"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import FallingLinesLoader from "@/components/admin/utility/FallingLinesLoader";
import Link from "next/link";
import phonepesvg from "@/public/phonepe-1.svg";
import Image from "next/image";

const Checkout = () => {
  const router = useRouter();

  const [cartLoading, setCartLoading] = useState(true);

  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});

  const fetchData = async (userToken) => {
    const response = await axios.post("/api/user/fetch-user", { userToken });

    const user = response.data.user;
    const cart = user.cart;
    const currentAddress = user.currentAddress;

    setUser(user);

    if (cart.length) {
      setCart(response.data.user.cart);
      setCartLoading(false);
      if (currentAddress && Object.keys(currentAddress).length > 0) {
        setShippingAddress(currentAddress);
        console.log(currentAddress);
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
                  <div
                    className="flex rounded-lg px-2 py-1 items-center mx-2 relative"
                  >
                    <img
                      className="w-14 h-auto"
                      src={item.imageURI}
                      alt="img"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="text-sm font-semibold">
                        {item.productName}
                      </span>
                      <div className="text-gray-600">Rs {item.costPrice}/-</div>
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
            <div className="mx-1 scale-90 flex items-center" key={shippingAddress.id}>
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
            <h1 className="font-bold mb-1">Payment Details</h1>

            <form>
              <input
                disabled
                className="my-2"
                type="radio"
                name="payment_method"
                value="phonepe"
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
              />
              <label htmlFor="pod" className="ml-3">
                Pay On Delivery
              </label>
            </form>
          </div>

          <div className="hidden md:flex w-full items-center justify-center mt-7">
            <Link
              href="/user/my-cart/checkout"
              className="bg-black px-10 py-2 rounded-lg text-white font-bold hover:opacity-75 w-full text-center"
            >
              Place Order
            </Link>
          </div>

          <div className="w-full flex items-center justify-center md:hidden">
            <Link
              href="/user/my-cart/checkout"
              className="absolute bottom-20 bg-[#FE6321] px-10 py-2 rounded-3xl text-white font-bold hover:opacity-75"
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
