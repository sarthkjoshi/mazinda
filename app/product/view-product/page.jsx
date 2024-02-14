"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import Carousel from "@/components/utility/Carousel";

import delivery_30_min from "@/public/item_desc_icons/delivery_30_min.png";
import instant_refund from "@/public/item_desc_icons/instant_refund.png";
import mazinda_delivered from "@/public/item_desc_icons/mazinda_delivered.png";
import pay_on_delivery from "@/public/item_desc_icons/pay_on_delivery.png";

import CartSVG from "@/public/svg/Cart";
import NextSVG from "@/public/svg/Next";
import OvalLoader from "@/components/Loading-Spinners/OvalLoader";
import CategoryPage from "@/app/user/browse-categories/[name]/page";

const ViewProduct = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const router = useRouter();
  const product_id = searchParams.get("id");

  const [product, setProduct] = useState({});
  const [store, setStore] = useState({});
  const [storeFollowers, setStoreFollowers] = useState(0);
  const [storeProducts, setStoreProducts] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [addingItemToCartLoading, setAddingItemToCartLoading] = useState(false);
  const [buyItemLoading, setBuyItemLoading] = useState(false);

  const fetchProduct = async (id) => {
    const { data } = await axios.post(`/api/product/fetch-product?id=${id}`);
    setProduct(data.product);
    fetchStore(data.product.storeId);
    fetchStoreProducts(data.product.storeId);
    // setPageLoading(false);
  };

  const fetchStore = async (store_id) => {
    const { data } = await axios.post("/api/store/fetch-store", {
      storeId: store_id,
    });
    setStore(data.store);
    setStoreFollowers(data.store.followers.length)
    // setPageLoading(false);
  };

  const fetchStoreProducts = async (store_id) => {
    const { data } = await axios.post("/api/store/fetch-store-products", {
      storeId: store_id,
    });
    setStoreProducts(data.products.length);
    setPageLoading(false);
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
  }, [product_id]);

  const UpdateItemInCart = async (product, filter = "add") => {
    setAddingItemToCartLoading(true);
    const userToken = Cookies.get("user_token");

    if (userToken) {
      try {
        const { data } = await axios.post(
          `/api/user/cart/add-update-item?filter=${filter}`,
          {
            itemInfo: {
              _id: product._id,
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
        if (data.success) {
          setCart(data.cart);
        }
      } catch (err) {
        console.log("An error occurred", err);
      }
    } else {
      // toast({
      //   title: "New to Mazinda?",
      //   description:
      //     "Signup/Login now to customize your cart and experience shopping like never before!",
      //   action: (
      //     <ToastAction
      //       altText="Try again"
      //       onClick={() => router.push("/user/auth/login")}
      //     >
      //       Login
      //     </ToastAction>
      //   ),
      // });
      
      localStorage.setItem('cart-product',JSON.stringify(product));
      router.push("/user/auth/login?redirect=cart");
      
    }
    setAddingItemToCartLoading(false);
  };

  const handleBuyNow = async (product) => {
    setBuyItemLoading(true);
    const userToken = Cookies.get("user_token");
    if (userToken) {
      try {
        await axios.post("/api/user/cart/buy-item", {
          itemInfo: product,
          userToken,
        });
      } catch (err) {
        console.log(err);
      }
      router.push("/user/my-cart/checkout");
    } else {
      // toast({
      //   title: "New to Mazinda?",
      //   description:
      //     "Signup/Login now to customize your cart and experience shopping like never before!",
      //   action: (
      //     <ToastAction
      //       altText="Try again"
      //       onClick={() => router.push("/user/auth/login")}
      //     >
      //       Login
      //     </ToastAction>
      //   ),
      // });
      // add product to local storage and after login add to cart for the
      localStorage.setItem('buynow-product',JSON.stringify(product));
      
      router.push("/user/auth/login?redirect=buynow");
    }
  };

  const handleGotoCart = async () => {
    router.push("/user/my-cart/checkout");
  }

  // Check if the product is in the cart
  useEffect(() => {
    setIsProductInCart(cart.some((item) => item._id === product._id));
  }, [cart, product]);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <OvalLoader />
      </div>
    );
  }

  return (
    <>
      {/* Mobile Version */}
      <div className="md:w-1/2 lg:w-1/3 md:mx-auto md:hidden px-3 mb-20">
        {/* <div className=""> */}
        <div className="mb-8">
          <Carousel arr={product.imagePaths} />
        </div>

        <div className="text-lg mb-5 mt-2">{product.productName}</div>

        <div className="flex gap-3 items-center">
          <span className="text-2xl">₹{product.pricing.salesPrice}</span>
          <span className="text-gray-500 line-through text-sm self-end mb-2">
            ₹{product.pricing.mrp}
          </span>
          <div className="text-center bg-green-200 rounded-full px-2 py-1 font-bold text-[12px] text-green-500">
            {String(
              ((product.pricing.mrp - product.pricing.salesPrice) /
                product.pricing.mrp) *
                100
            ).slice(0, 4)}
            % OFF
          </div>
        </div>

        <div className="mt-10 w-full flex justify-center bottom-0">
          <button
            onClick={() => handleBuyNow(product)}
            className={`px-5 py-2 rounded-md text-white mx-1 text-lg font-bold transition-all duration-300 ${
              !buyItemLoading ? "bg-[#F17E13]" : "bg-gray-400"
            }`}
          >
            {!buyItemLoading ? (
              <span className="flex items-center gap-1">
                <NextSVG />
                Buy Now
              </span>
            ) : (
              "Redirecting..."
            )}
          </button>

          {!isProductInCart ? (
            <button
              onClick={() => {
                UpdateItemInCart(product);
              }}
              className="bg-white px-4 py-2 rounded-md text-[#F17E13] mx-1 text-lg border border-[#F17E13]"
            >
              {addingItemToCartLoading ? (
                "Adding to Cart..."
              ) : (
                <span className="flex">
                  <CartSVG color="#F17E13" /> Add to Cart
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center bg-white mx-1 text-2xl   rounded-md  overflow-hidden">
              <button 
                    onClick={() => {
                      handleGotoCart(product);
                    }}
                    className="bg-white px-4 py-2 rounded-3xl text-[#F17E13] mx-1 text-lg border border-[#F17E13]"> Go to Cart</button>
            
              {/* <button
                onClick={() => {
                  UpdateItemInCart(product, "decrement");
                }}
                className="bg-[#f17e13] text-white px-4 py-2"
              >
                -
              </button>
              <span className="px-4 py-2">
                {cart.find((item) => item._id === product._id)?.quantity}
              </span>
              <button
                onClick={() => {
                  UpdateItemInCart(product, "increment");
                }}
                className="bg-[#f17e13] text-white px-4 py-2"
              >
                +
              </button> */}
            </div>
          )}
        </div>

        <hr className="my-5" />

        <div className="flex gap-x-5">
          <div className="flex flex-col items-center justify-center">
            <Image height={30} width={30} src={delivery_30_min} alt={""} />
            <span className="text-center text-sm mt-2 text-orange-500">
              30 min Delivery
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              className="scale-105"
              height={30}
              width={30}
              src={instant_refund}
              alt={""}
            />
            <span className="text-center text-sm mt-2 text-orange-500">
              Instant Return
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              height={30}
              width={30}
              src={mazinda_delivered}
              alt={""}
              className="scale-150"
            />
            <span className="text-center text-sm text-orange-500 mt-2">
              Mazinda Delivered
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image height={30} width={30} src={pay_on_delivery} alt={""} />
            <span className="text-center text-sm mt-2 text-orange-500">
              COD Available
            </span>
          </div>
        </div>

        <hr className="my-5" />

        <div className="shadow-[-2px_2px_10px_0px_#00000010] py-2 px-3 rounded-lg">
              <span className="text-lg text-gray-500">Sold By</span>
              <hr />
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg">{store.storeName}</span>
                <Link
                  href={`/store/view-store?id=${store._id}`}
                  className="border border-[#F17E13] text-[#F17E13] px-2 py-1 rounded-md"
                >
                  View Shop
                </Link>
              </div>

              <div className="flex justify-evenly mt-3">
                <div className="flex flex-col items-center">
                  <span className="text-xl">{storeFollowers}</span>
                  <span className="text-[10px]">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">{storeProducts}</span>
                  <span className="text-[10px]">Products</span>
                </div>
              </div>
        </div> 

        {product.description.map((item, index) => (
          <div
            key={index}
            className="shadow-[-2px_2px_10px_0px_#00000010] py-2 px-3 rounded-lg my-3"
          >
            <span className="text-lg text-gray-500">{item.heading}</span>
            <hr />

            <div className="flex justify-between items-center mt-3">
              <p className="mx-5 text-gray-800">
                {item.description.split("\n").map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    {lineIndex < item.description.split("\n").length - 1 && (
                      <br />
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        ))}

        <div>
          <h1 className="text-lg pt-3 px-3">Similar Products</h1>
          <CategoryPage
            params={{ name: product.category, useInOtherPage: true }}
          />
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex">
        <div className="w-1/3 h-screen bg-white fixed top-auto left-0 overflow-y-auto overflow-x-hidden">
          <div className="p-2 w-full">
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
                <div className="flex items-center bg-white rounded-3xl mx-1 text-2xl">

                  <button 
                    onClick={() => {
                      handleGotoCart(product);
                    }}
                    className="bg-white px-4 py-2 rounded-3xl text-[#F17E13] mx-1 text-lg border border-[#F17E13]">Go to Cart</button>

                  {/* <button
                    onClick={() => {
                      UpdateItemInCart(product, "decrement");
                    }}
                    className="bg-[#f17e13] text-white px-4 rounded-l-full py-2"
                  >
                    -
                  </button>
                  <span className="px-4">
                    {cart.find((item) => item._id === product._id)?.quantity}
                  </span>
                  <button
                    onClick={() => {
                      UpdateItemInCart(product, "increment");
                    }}
                    className="bg-[#f17e13] text-white rounded-r-3xl px-4 py-2"
                  >
                    +
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/3 h-screen ml-[33.33333333%] p-5">
          <span className="text-xl">{product.productName}</span>
          <div className="mt-3">
            <span className="text-3xl">₹ {product.pricing.salesPrice}/-</span>
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
          <hr className="my-5" />
          <div className="flex gap-x-5">
            <div className="flex flex-col items-center justify-center">
              <Image height={30} width={30} src={delivery_30_min} alt={""} />
              <span className="text-sm mt-2 text-orange-500">
                30 min Delivery
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                className="scale-105"
                height={30}
                width={30}
                src={instant_refund}
                alt={""}
              />
              <span className="text-sm mt-2 text-orange-500">
                Instant Refund
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                height={30}
                width={30}
                src={mazinda_delivered}
                alt={""}
                className="scale-150"
              />
              <span className="text-sm text-orange-500 mt-2">
                Mazinda Delivered
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image height={30} width={30} src={pay_on_delivery} alt={""} />
              <span className="text-sm mt-2 text-orange-500">COD Avaiable</span>
            </div>
          </div>

          <hr className="my-5" />

          <div className="shadow-[-2px_2px_10px_0px_#00000010] py-2 px-3 rounded-lg">
              <span className="text-lg text-gray-500">Sold By</span>
              <hr />
              <div className="flex flex-row  items-center mt-3">
                <span className="text-lg">{store.storeName}</span>
                <Link
                  href={`/store/view-store?id=${store._id}`}
                  className="ml-5 border border-[#F17E13] text-[#F17E13] px-2 py-1 rounded-md"
                >
                  View Shop
                </Link>
              </div>

              <div className="flex mt-3">
                <div className="flex flex-col mr-5 items-center">
                  <span className="text-xl">{storeFollowers}</span>
                  <span className="text-[10px]">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl"> {storeProducts}</span>
                  <span className="text-[10px]">Products</span>
                </div>
              </div>
          </div> 

          <div>
            {product.description.map((item, index) => {
              return (
                <div key={index} className="flex p-2 my-3">
                  <span className="font-semibold text-gray-500 min-w-[60px]">
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
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
