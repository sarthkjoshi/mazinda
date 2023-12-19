"use client";

import Link from "next/link";
import MazindaLogoFull from "@/public/logo_mazinda_full.png";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import OvalLoader from "./Loading-Spinners/OvalLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import Image from "next/image";
import LoadingCategoryImage from "@/public/LoadingCategory.png";

import CartSVG from "@/public/svg/Cart";
import ProfileSVG from "@/public/svg/Profile";
import SearchSVG from "@/public/svg/Search";
import LocationSVG from "@/public/svg/Location";
import { useLocation, useUpdateLocation } from "@/contexts/LocationContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [products, setProducts] = useState([]);
  const [showCityBox, setShowCityBox] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [locationLoading, setLocationLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [showLocationDropbox, setShowLocationDropbox] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const selectedLocation = useLocation();
  const updateLocation = useUpdateLocation();

  const fetchProducts = async (searchQuery) => {
    const { data } = await axios.post(
      "/api/product/fetch-search-products-name",
      {
        searchQuery,
        availablePincodes: selectedLocation.pincodes,
      }
    );
    setProducts(data.products);
  };

  const fetchLocations = async () => {
    try {
      const { data } = await axios.get("/api/location/fetch-locations");
      if (data.success) {
        setLocations(data.locations);
      }
      setLocationLoading(false);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocationLoading(false);
    }
  };

  const handleCityClick = (locationInfo) => {
    updateLocation(locationInfo);
    setShowLocationDropbox(false);
  };

  const fetchCategories = async () => {
    const { data } = await axios.post("/api/category/fetch-categories");
    if (data.success) {
      setCategories(data.categories);
    } else {
      return <>Oops... Something Went Wrong !</>;
    }
    setCategoriesLoading(false);
  };

  useEffect(() => {
    fetchLocations();
    fetchCategories();
    const user_token = Cookies.get("user_token");
    if (user_token) {
      setIsLoggedIn(true);
    }
  }, [pathname]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowCityBox(false);
    }, 4000);

    return () => {
      // Clear the timer when the component unmounts or when the pathname changes
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      {!pathname.includes("auth") && (
        <nav className="bg-white border-gray-200 py-2 rounded-b-lg w-full">
          {showSearchBox && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-10" />
          )}

          <div className="flex flex-col">
            <div className="flex justify-between md:justify-normal items-center p-4">
              <Link href="/" className="hidden md:block self-start">
                <Image
                  height={60}
                  src={MazindaLogoFull}
                  className="mr-3"
                  alt="Mazinda Logo"
                />
              </Link>
              <Link href="/" className="self-start block md:hidden">
                <Image
                  height={40}
                  src={MazindaLogoFull}
                  className="mr-3"
                  alt="Mazinda Logo"
                />
              </Link>

              <div className="hidden md:block scale-90 ml-5">
                <Popover>
                  <PopoverTrigger className="text-gray-600">
                    Categories
                  </PopoverTrigger>
                  <PopoverContent className="w-[100vw] mx-3 my-2 rounded-2xl bg-white">
                    {!categoriesLoading ? (
                      <div className="flex flex-wrap justify-center">
                        {categories.map((category) => {
                          return (
                            <Link
                              key={category._id}
                              href={`/user/browse-categories/${category.categoryName}`}
                              className="m-2 p-2 flex flex-col items-center cursor-pointer"
                            >
                              <img
                                style={{ maxWidth: "60px", minWidth: "60px" }}
                                src={category.categoryImage}
                                alt={category.categoryName}
                              />
                              <span className="text-gray-600 font-bold">
                                {category.categoryName}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap justify-center">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <Image
                              key={i}
                              className="m-2 p-2"
                              src={LoadingCategoryImage}
                              alt="Loading"
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mx-1 md:relative w-full md:mx-5 hidden md:flex">
                <input
                  className="text-md rounded-lg py-[0.2em] md:py-[0.5em] px-3 md:px-6 w-full  border border-gray-400 text-gray-500 z-20"
                  type="text"
                  placeholder="Search Anything ..."
                  value={searchQuery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (searchQuery !== "") {
                        router.push(`/user/search/${searchQuery}`);
                      }
                      setShowSearchBox(false);
                    }
                  }}
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
                    <Link
                      href={`/user/search/${searchQuery}`}
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

                    {products &&
                      products.length > 0 &&
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

              <div className="relative">
                <Link
                  href="/user/my-account"
                  className="hidden md:flex items-center mr-5 scale-90"
                >
                  <ProfileSVG />
                  <span className="text-gray-600">
                    {isLoggedIn ? "Account" : "Login"}
                  </span>
                </Link>
              </div>

              <div className="flex md:scale-95 relative">
                <LocationSVG />

                <div className="flex flex-col w-[90px] md:w-[120px]">
                  <span className="text-gray-600 text-[9px] md:text-sm">
                    Deliver to
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span
                        className="flex items-center cursor-pointer text-gray-600 text-sm"
                        onClick={() =>
                          setShowLocationDropbox(!showLocationDropbox)
                        }
                      >
                        {selectedLocation.city
                          ? selectedLocation.city
                          : "Fetching.."}
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
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-44 p-0 rounded-xl">
                      <DropdownMenuLabel className="bg-[#f17e13] rounded-t-lg text-center text-white py-2 px-4">
                        Select Your City
                      </DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={selectedLocation.city}>
                        {!locationLoading ? (
                          locations.map((location) => {
                            return (
                              <React.Fragment key={location._id}>
                                <DropdownMenuRadioItem
                                  value={location.city}
                                  className="py-2"
                                  onClick={() => handleCityClick(location)}
                                >
                                  {location.city}
                                </DropdownMenuRadioItem>
                                <DropdownMenuSeparator className="m-0" />
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <div className="bg-white py-2 rounded-b-lg">
                            <OvalLoader />
                          </div>
                        )}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="px-2 w-full md:hidden relative">
              <input
                className="text-md rounded-lg py-2 px-3 md:px-6 w-full border border-gray-400 text-gray-500"
                type="text"
                placeholder="Search Anything ..."
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (searchQuery !== "") {
                      router.push(`/user/search/${searchQuery}`);
                    }
                    setShowSearchBox(false);
                  }
                }}
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
                  className={`absolute top-12 left-2 border rounded-md w-[96vw] bg-white z-50 ${
                    searchQuery.length === 0 ? "hidden" : ""
                  }`}
                >
                  <Link
                    href={`/user/search/${searchQuery}`}
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

                  {products &&
                    products.length > 0 &&
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
          </div>
        </nav>
      )}

      {pathname !== "/" && !pathname.includes("auth") && (
        <button
          className="text-gray-600 rounded-md ml-2 hover:text-gray-700 focus:outline-none absolute md:hidden z-40 bg-white"
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
