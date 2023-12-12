"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import PriceLoading from "@/public/loading/PricingLoading.png";
import ButtonLoading from "@/public/loading/ButtonLoading.png";
import SmallRectangleLoading from "@/public/loading/SmallRectangleLoading.png";
import Carousel from "@/components/utility/Carousel";

const ViewProduct = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const router = useRouter();
  const product_id = searchParams.get("id");

  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [addingItemToCartLoading, setAddingItemToCartLoading] = useState(false);
  const [buyItemLoading, setBuyItemLoading] = useState(false);

  const fetchProduct = async (id) => {
    const response = await axios.post(`/api/product/fetch-product?id=${id}`);
    setProduct(response.data.product);
  };

  const fetchUserCart = async () => {
    const userToken = Cookies.get("user_token");
    if (userToken) {
      const { data } = await axios.post("/api/user/fetch-user", { userToken });
      setCart(data.user.cart);
    }
  };

  useEffect(() => {
    fetchProduct(product_id);
    fetchUserCart();
  }, []);

  const UpdateItemInCart = async (product, filter = "add") => {
    setAddingItemToCartLoading(true);
    const userToken = Cookies.get("user_token");

    if (userToken) {
      try {
        const { data } = await axios.post(
          `/api/user/cart/add-update-item?filter=${filter}`,
          {
            itemInfo: {
              productID: product._id,
              productName: product.productName,
              imagePaths: product.imagePaths,
              storeID: product.storeId,
              costPrice: product.pricing.costPrice,
              salesPrice: product.pricing.salesPrice,
              mrp: product.pricing.mrp,
            },
            userToken,
          }
        );
        console.log(data);
        if (data.success) {
          // Updated code
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
    setAddingItemToCartLoading(false);
  };

  const handleBuyNow = async (product) => {
    setBuyItemLoading(true);
    const userToken = Cookies.get("user_token");
    if (userToken) {
      try {
        const response = await axios.post("/api/user/cart/buy-item", {
          itemInfo: product,
          userToken,
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      router.push("/user/my-cart/checkout");
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
    setBuyItemLoading(false);
  };

  // Check if product and pricing are defined
  const isProductDefined = Object.keys(product).length > 0;
  const isPricingDefined = isProductDefined && product.pricing;

  // Check if the product is in the cart
  useEffect(() => {
    setIsProductInCart(cart.some((item) => item.productID === product._id));
  }, [cart, product]);

  return (
    <>
      <div className="md:w-1/2 lg:w-1/3 md:mx-auto md:hidden">
        {isProductDefined ? (
          <div className="p-2">
            <Carousel arr={product.imagePaths} />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Skeleton className="w-full h-[40vh] md:h-[54vh] mt-10 mb-2 mx-5 md:m-2 rounded-lg" />
          </div>
        )}

        <div className="bg-gray-50 h-full p-4 rounded-3xl mt-5 flex flex-col items-center">
          <span className="text-md text-gray-600 mb-5">
            {isProductDefined ? product.productName : ""}
          </span>
          <div className="w-full">
            <span className="text-[12px] text-gray-700">
              {isProductDefined ? (
                "Price:"
              ) : (
                <Image className="mb-3" src={SmallRectangleLoading} alt="" />
              )}
            </span>
            {isPricingDefined ? (
              <div>
                <span className="text-xl">
                  Rs {product.pricing.salesPrice}/-
                </span>
                <span className="ml-4 text-[12px] text-gray-500">
                  <s>Rs {product.pricing.mrp}/-</s>
                </span>
              </div>
            ) : (
              <Image src={PriceLoading} alt="" />
            )}

            {isProductDefined ? (
              <div className="mt-4 w-full flex justify-center">
                <button
                  onClick={() => handleBuyNow(product)}
                  className={`px-5 py-2 rounded-3xl text-white mx-1 text-sm font-bold transition-all duration-300 ${
                    !buyItemLoading ? "bg-[#F17E13]" : "bg-gray-400"
                  }`}
                >
                  {!buyItemLoading ? "Buy Now" : "Redirecting..."}
                </button>

                {!isProductInCart ? (
                  <button
                    onClick={() => {
                      UpdateItemInCart(product);
                    }}
                    className="bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]"
                  >
                    {addingItemToCartLoading
                      ? "Adding to Cart..."
                      : "Add to Cart"}
                  </button>
                ) : (
                  // (
                  //   <Link
                  //     href="/user/my-cart"
                  //     className="cursor-pointer bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]"
                  //   >
                  //     Added to Cart
                  //   </Link>
                  // )
                  <div className="flex items-center">
                    <span className="bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]">
                      Quantity:{" "}
                      {cart.find((item) => item.productID === product._id)
                        ?.quantity || 0}
                    </span>
                    <button
                      onClick={() => {
                        UpdateItemInCart(product);
                      }}
                      className="bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]"
                    >
                      {addingItemToCartLoading
                        ? "Adding to Cart..."
                        : "Add more"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center my-5">
                <Image className="mx-2" src={ButtonLoading} alt="" />
                <Image className="mx-2" src={ButtonLoading} alt="" />
              </div>
            )}

            {isProductDefined ? (
              <div className="mt-4 mb-12">
                {product.description.map((item, index) => (
                  <div key={index} className="text-sm">
                    <h1 className="text-xl font-semibold">{item.heading}</h1>
                    <p className="mx-5 text-gray-800">
                      {item.description.split("\n").map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          {lineIndex <
                            item.description.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Image src={PriceLoading} alt="" />
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex">
        <div className="w-1/3 h-screen bg-white fixed top-auto left-0 overflow-y-auto overflow-x-hidden">
          <div className="p-2 w-full">
            {isProductDefined ? (
              <>
                <Carousel arr={product.imagePaths} />
                <div className="mt-10 w-full flex justify-center">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className={`px-5 py-2 rounded-3xl text-white mx-1 text-lg font-bold transition-all duration-300 ${
                      !buyItemLoading ? "bg-[#F17E13]" : "bg-gray-400"
                    }`}
                  >
                    {!buyItemLoading ? "Buy Now" : "Redirecting..."}
                  </button>

                  {!isProductInCart ? (
                    <button
                      onClick={() => {
                        UpdateItemInCart(product);
                      }}
                      className="bg-white px-4 py-2 rounded-3xl text-[#F17E13] mx-1 text-lg border border-[#F17E13]"
                    >
                      {addingItemToCartLoading
                        ? "Adding to Cart..."
                        : "Add to Cart"}
                    </button>
                  ) : (
                    <div className="flex items-center bg-white rounded-3xl mx-1 border border-[#F17E13] text-2xl">
                      <button
                        onClick={() => {
                          UpdateItemInCart(product, "decrement");
                        }}
                        className="bg-[#f17e13] text-white px-4 rounded-l-full py-2"
                      >
                        -
                      </button>
                      <span className="px-4">
                        {
                          cart.find((item) => item.productID === product._id)
                            ?.quantity
                        }
                      </span>
                      <button
                        onClick={() => {
                          UpdateItemInCart(product, "increment");
                        }}
                        className="bg-[#f17e13] text-white rounded-r-3xl px-4 py-2"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              "Loading"
            )}
          </div>
        </div>
        <div className="w-2/3 h-screen ml-[33.33333333%] p-5">
          {isProductDefined ? (
            <>
              <span className="text-xl">{product.productName}</span>
              <div className="mt-3">
                <span className="text-3xl">
                  ₹ {product.pricing.salesPrice}/-
                </span>
                <span className="ml-4 text-lg text-gray-500">
                  <s>₹ {product.pricing.mrp}/-</s>
                </span>
                <span className="ml-4 text-lg text-green-600 font-bold">
                  {String(
                    ((product.pricing.mrp - product.pricing.salesPrice) /
                      product.pricing.mrp) *
                      100
                  ).slice(0, 4)}
                  % off
                </span>
              </div>

              <div>
                {product.description.map((item, index) => {
                  return (
                    <div key={index} className="flex p-2 my-3">
                      <span className="font-semibold text-gray-500">
                        {item.heading}
                      </span>
                      <p className="mx-5 text-gray-800">
                        {item.description.split("\n").map((line, lineIndex) => (
                          <React.Fragment key={lineIndex}>
                            {line}
                            {lineIndex <
                              item.description.split("\n").length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProduct;