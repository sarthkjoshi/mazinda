"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import FallingLinesLoader from "@/components/admin/utility/FallingLinesLoader";
import Link from "next/link";

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
    <>
      <h1 className="text-center text-2xl">Checkout</h1>

      <div>
        <div>
          {cartLoading ? (
            <FallingLinesLoader />
          ) : (
            cart.length > 0 &&
            cart.map((item) => {
              return (
                <>
                  <div
                    className="flex rounded-lg px-2 py-1 items-center mx-2 relative"
                    key={item.productID}
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
                </>
              );
            })
          )}
          <Link href='/user/my-cart/checkout/shipping-info' className="flex mt-2 items-center mx-2 justify-between">
            <span className="text-sm">Shipping To</span>
            <div className="mx-1 scale-90" key={shippingAddress.id}>
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
          </Link>
        </div>
      </div>
    </>
  );
};

export default Checkout;
