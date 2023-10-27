"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";

const ShippingInfo = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState({});
  const [currentAddress, setCurrentAddress] = useState({});
  const [userToken, setUserToken] = useState("");
  const [savedAddresses, setSavedAddresses] = useState({});
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    email: "",
    subaddress: "",
    city: "",
    state: "",
  });

  const [expandedNewAddress, setExpandedNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleOnChange = async (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = async () => {
    const response = await axios.post(
      "/api/user/shipping-addresses/add-new-address",
      { newAddress, userToken }
    );
    if (response.data.success) {
      const newSavedAddresses = response.data.newSavedAddresses;
      setSavedAddresses(newSavedAddresses);
      setNewAddress({
        name: "",
        phone: "",
        email: "",
        subaddress: "",
        city: "",
        pincode: "",
        state: "",
      });
      setExpandedNewAddress(false);
    }
  };

  const handleAddressClick = async (address) => {
    setSelectedAddress(selectedAddress === address ? null : address);

    const response = await axios.post(
      "/api/user/shipping-addresses/set-current-address",
      { userToken, currentAddress: selectedAddress === address ? null : address }
    );
    console.log(response.data);
  };

  const fetchData = async (userToken) => {
    const response = await axios.post("/api/user/fetch-user", { userToken });

    const user = response.data.user;
    const currentAddress = user.currentAddress;
    const savedAddresses = user.savedAddresses;
    
    setUser(user);
    setSelectedAddress(currentAddress);
    setSavedAddresses(savedAddresses);
  };

  useEffect(() => {
    const userToken = Cookies.get("user_token");
    setUserToken(userToken);
    if (!userToken) {
      router.push("/user/auth/login");
      return;
    }
    fetchData(userToken);
    setPageLoading(false);
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl">Shipping Info</h1>
      <div>
        {!pageLoading ? (
          <div className="p-3">
            <div>
              <div
                className={`border ${
                  expandedNewAddress ? "border-[#FE6321]" : ""
                } rounded-3xl`}
              >
                <div
                  className="px-5 py-2 text-gray-600 flex justify-between items-center"
                  onClick={() => setExpandedNewAddress(true)}
                >
                  <span className="cursor-pointer">Add New Address</span>
                  {!expandedNewAddress && (
                    <svg
                      className="w-4 h-4 text-gray-600 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  )}
                </div>

                {expandedNewAddress && (
                  <div className="px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        Full Name
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.name}
                        name="name"
                        className="p-1 rounded-full text-sm px-4"
                        type="text"
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        Phone/Contact
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.phone}
                        name="phone"
                        className="p-1 rounded-full text-sm px-4"
                        type="text"
                        placeholder="10-Digit Phone Number"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        Email
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.email}
                        name="email"
                        className="p-1 rounded-full text-sm px-4"
                        type="email"
                        placeholder="for eg. youremail@xyz.com"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        Address
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.subaddress}
                        name="subaddress"
                        className="p-1 rounded-full text-sm px-4"
                        type="text"
                        placeholder="eg. House No, Street Name, etc"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        City
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.city}
                        name="city"
                        className="p-1 rounded-full text-sm px-4"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        Pincode
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.pincode}
                        name="pincode"
                        className="p-1 rounded-full text-sm px-4"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-600">
                        State
                      </span>
                      <input
                        onChange={handleOnChange}
                        value={newAddress.state}
                        name="state"
                        className="p-1 rounded-full text-sm px-4"
                        type="text"
                      />
                    </div>

                    <div className="w-full flex justify-center my-3">
                      <button
                        onClick={handleAddAddress}
                        className="border border-[#FE6321] bg-[#FE6321] px-5 py-1 rounded-full text-white font-bold text-sm mx-1"
                      >
                        Add Address
                      </button>

                      <button
                        onClick={() => {
                          setExpandedNewAddress((prev) => !prev);
                        }}
                        className="border border-gray-300 text-gray-500 bg-white px-5 py-1 rounded-full font-bold text-sm mx-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <h1 className="mt-4 mb-2 px-2 text-lg">
                Select Shipping Address
              </h1>

              <div>
                {savedAddresses && savedAddresses.length ? (
                  <div>
                    {savedAddresses.map((address) => {
                      const isSelected = selectedAddress.id === address.id;
                      return (
                        <div
                          className={`border my-2 rounded-2xl p-4 ${
                            isSelected
                              ? "border-[#FE6321] bg-[#FE6321] bg-opacity-10"
                              : ""
                          }`}
                          key={address.id}
                          onClick={() => handleAddressClick(address)}
                        >
                          <h1 className="text-xl">{address.name}</h1>
                          <div className="text-sm text-gray-600">
                            <p>
                              {address.subaddress}
                              <br />
                              {address.city}, {address.state}, {address.pincode}
                              , IN
                            </p>
                            <div>
                              <div>+91 {address.phone}</div>
                              <div>{address.email}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="w-full flex items-center justify-center">
                      <Link
                        href="/user/my-cart/checkout"
                        className="absolute bottom-20 bg-[#FE6321] px-10 py-2 rounded-3xl text-white font-bold hover:opacity-75"
                      >
                        Continue to Checkout
                      </Link>
                    </div>
                  </div>
                ) : (
                  "No saved addresses"
                )}
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default ShippingInfo;
