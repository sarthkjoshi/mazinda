"use client";

import Link from "next/link";
import MazindaLogo from "@/public/logo_mini.png";
import MazindaLogoFull from "@/public/logo_mazinda_full.png";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import OvalLoader from "../admin/utility/OvalLoader";
import Cookies from "js-cookie";

import Image from "next/image";
import CartSVG from "@/public/svg/Cart";
import ProfileSVG from "@/public/svg/Profile";
import SearchSVG from "@/public/svg/Search";
import LocationSVG from "@/public/svg/Location";

const Navbar = () => {
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [products, setProducts] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [locationLoading, setLocationLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [showLocationDropbox, setShowLocationDropbox] = useState(false);

  const fetchProducts = async (searchQuery) => {
    const response = await axios.post(
      "/api/product/fetch-search-products-name",
      {
        searchQuery,
      }
    );
    setProducts(response.data.products);
  };

  const fetchLocations = async () => {
    const response = await axios.post("/api/location/fetch-locations");
    setLocations(response.data.locations);
    setSelectedLocation(response.data.locations[0].city);

    // Setting location info in cookies
    Cookies.set("selectedLocation", JSON.stringify(response.data.locations[0]));
    setLocationLoading(false);
  };

  useEffect(() => {
    fetchLocations();
    const user_token = Cookies.get("user_token");
    if (user_token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {!pathname.includes("/store") &&
        !pathname.includes("auth") &&
        !pathname.includes("admin") && (
          <nav className="bg-white border-gray-200 py-2">
            {showSearchBox && (
              <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-10" />
            )}
            <div className="flex items-center justify-between mx-auto p-4">
              <Link href="/" className="md:hidden mr-1">
                <Image width={90} src={MazindaLogo} alt="Mazinda Logo" />
              </Link>
              <Link href="/" className="hidden md:block self-start">
                <Image
                  height={60}
                  src={MazindaLogoFull}
                  className="mr-3"
                  alt="Mazinda Logo"
                />
              </Link>

              <div className="flex mx-1 md:relative items-center flex-col w-full">
                <input
                  className="text-md rounded-full px-3 pr-6 py-[0.2em] md:py-[0.3em] md:px-6 w-full md:w-5/6 border-none bg-gray-100 md:bg-gray-50 text-gray-500 outline-[#f17e13] z-20"
                  type="text"
                  placeholder="Search Anything ..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchBox(true);

                    if (e.target.value.length === 0) {
                      setProducts([]);
                      setShowSearchBox(false);
                    } else if (e.target.value.length > 1) {
                      fetchProducts(e.target.value);
                    }
                  }}
                />

                {showSearchBox && (
                  <div
                    className={`absolute top-20 md:top-14 left-0 md:left-auto border rounded-md w-full bg-white z-50 md:w-5/6 ${
                      searchQuery.length === 0 ? "hidden" : ""
                    }`}
                  >
                    <Link href={`/user/search/${searchQuery}`}
                      className="rounded-md px-3 py-2 flex items-center text-sm font-semibold cursor-pointer"
                      onClick={() => {
                        setShowSearchBox(false);
                        setSearchQuery(searchQuery);
                      }}
                    >
                      <SearchSVG />

                      {searchQuery}
                    </Link>
                    <hr />

                    {products.length > 0 &&
                      products.map((product, index) => {
                        return (
                          <div key={index}>
                            <Link
                            href={`/user/search/${product.productName}`}
                              className="rounded-md px-3 py-2 flex items-center text-sm font-semibold cursor-pointer"
                              onClick={() => {
                                setSearchQuery(product.productName);
                                setShowSearchBox(false);
                              }}
                            >
                              <SearchSVG />
                              {product.productName}
                            </Link>
                            <hr />
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              <Link
                href="/user/my-cart"
                className="hidden md:flex items-center mr-5 scale-90"
              >
                <CartSVG />
                <span className="text-gray-600">Cart</span>
              </Link>

              <Link
                href="/user/my-account"
                className="hidden md:flex items-center mr-5 scale-90"
              >
                <ProfileSVG />
                <span className="text-gray-600">
                  {isLoggedIn ? "Profile" : "Login"}
                </span>
              </Link>

              <div className="flex md:scale-95">
                <LocationSVG />

                <div className="flex flex-col min-w-[100px]">
                  <span className="text-gray-600 text-[9px] md:text-sm">
                    Deliver to
                  </span>
                  <span className="text-gray-600 text-sm md:text-lg">
                    {!locationLoading ? (
                      <span className="">
                        <span
                          className="flex items-center cursor-pointer"
                          onClick={() =>
                            setShowLocationDropbox(!showLocationDropbox)
                          }
                        >
                          {selectedLocation}
                          <svg
                            className="w-2 h-2 text-gray-800 dark:text-white ml-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 8"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                            />
                          </svg>
                        </span>
                        {showLocationDropbox && (
                          <div className="absolute mt-2 right-2">
                            <div className="border shadow rounded-xl flex flex-col items-center md:w-40">
                              <span className="bg-[#f17e13] text-white w-full text-center rounded-t-lg p-2 px-5 md:text-[0.8em]">
                                Select Your City
                              </span>
                              <ul className="w-full">
                                {locations.map((location) => {
                                  return (
                                    <>
                                      <li
                                        key={location._id}
                                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-center bg-white"
                                        onClick={() => {
                                          Cookies.set(
                                            "selectedLocation",
                                            JSON.stringify(location)
                                          );
                                          setShowLocationDropbox(false);
                                        }}
                                      >
                                        {location.city}
                                      </li>
                                      <hr />
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        )}
                      </span>
                    ) : (
                      <div className="scale-50 md:scale-90">
                        <OvalLoader />
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </nav>
        )}

      {pathname !== "/" && !pathname.includes("auth") && (
        <button
          id="backBtn"
          type="button"
          className="text-gray-600 rounded-md ml-2 hover:text-gray-700 focus:outline-none absolute lg:hidden"
          onClick={() => window.history.back()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16L13.4 14.6L11.8 13H16V11H11.8L13.4 9.4L12 8L8 12L12 16ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
              fill="black"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Navbar;
