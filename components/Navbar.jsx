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
    </>
  );
};

export default Navbar;
