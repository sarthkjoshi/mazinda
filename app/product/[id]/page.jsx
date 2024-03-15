import axios from "axios";
import Image from "next/image";
import Link from "next/link";

// import Carousel from "@/components/utility/Carousel";

import delivery_30_min from "@/public/item_desc_icons/delivery_30_min.png";
import instant_refund from "@/public/item_desc_icons/instant_refund.png";
import mazinda_delivered from "@/public/item_desc_icons/mazinda_delivered.png";
import pay_on_delivery from "@/public/item_desc_icons/pay_on_delivery.png";
import React from "react";
import CarouselShadcn from "@/components/CarouselShadcn";

const fetchProduct = async (id) => {
  const { data } = await axios.post(
    `https://mazinda.com/api/product/fetch-product?id=${id}`
  );
  if (data.success) {
    return data.product;
  } else {
    return {};
  }
};

const ProductPage = async ({ params }) => {
  const product = await fetchProduct(params.id);

  return (
    <div>
      {/* Desktop Version */}
      <div className="hidden md:flex">
        <div className="w-1/3 h-screen bg-white fixed top-auto left-0 overflow-y-auto overflow-x-hidden">
          <div className="p-2 w-full">
            {/* <Carousel arr={product.imagePaths} /> */}
            <CarouselShadcn images={product.imagePaths} />
            {/* <div className="mt-10 w-full flex justify-center">
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
                    className="bg-white px-4 py-2 rounded-3xl text-[#F17E13] mx-1 text-lg border border-[#F17E13]"
                  >
                    Go to Cart
                  </button>

                  <button
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
                  </button>
                </div>
              )}
            </div> */}
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

          {/* <div className="shadow-[-2px_2px_10px_0px_#00000010] py-3 px-6 rounded-lg w-fit">
            <span className="text-lg text-gray-500">Sold By</span>
            <hr />
            <div className="flex flex-row  items-center mt-3">
              <span className="text-lg">{store.storeName}</span>
              <Link
                href={`/${store.storeName.toLowerCase().replace(/\s+/g, "-")}`}
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
          </div> */}

          <div>
            {product.description.map((item, index) => {
              return (
                <div key={index} className="grid grid-cols-7 my-5">
                  <span className="font-semibold text-gray-500 col-span-1">
                    {item.heading}
                  </span>
                  <p className="text-gray-800 col-span-6">
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
    </div>
  );
};

export default ProductPage;

// or Dynamic metadata
export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);

  let description;

  product.description.map((item, index) => {
    description += item.description;
  });

  return {
    title: `${product.productName} : mazinda.com`,
    description: `${description} : Mazinda - Ab Maze Mein India. Mazinda mazinda.com`,
  };
}
