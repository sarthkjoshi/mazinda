import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import delivery_30_min from "@/public/item_desc_icons/delivery_30_min.png";
import instant_refund from "@/public/item_desc_icons/instant_refund.png";
import mazinda_delivered from "@/public/item_desc_icons/mazinda_delivered.png";
import pay_on_delivery from "@/public/item_desc_icons/pay_on_delivery.png";
import React from "react";
import ProductImageCarousel from "@/components/ProductImageCarousel";

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

const renderProductDetails = (product) => (
  <>
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
  </>
);

const renderUtilityImages = () => (
  <div className="flex gap-x-5">
    <div className="flex flex-col items-center justify-center">
      <Image height={30} width={30} src={delivery_30_min} alt={""} />
      <span className="text-sm mt-2 text-orange-500">30 min Delivery</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <Image
        className="scale-105"
        height={30}
        width={30}
        src={instant_refund}
        alt={""}
      />
      <span className="text-sm mt-2 text-orange-500">Instant Refund</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <Image
        height={30}
        width={30}
        src={mazinda_delivered}
        alt={""}
        className="scale-150"
      />
      <span className="text-sm text-orange-500 mt-2">Mazinda Delivered</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <Image height={30} width={30} src={pay_on_delivery} alt={""} />
      <span className="text-sm mt-2 text-orange-500">COD Avaiable</span>
    </div>
  </div>
);

const renderDescription = (product) => (
  <>
    <div className="hidden md:block">
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
                  {lineIndex < item.description.split("\n").length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        );
      })}
    </div>
    <div className="md:hidden">
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
    </div>
  </>
);

const ProductPage = async ({ params }) => {
  const product = await fetchProduct(params.id);

  return (
    <>
      {/* Mobile Version */}
      <div className="md:w-1/2 lg:w-1/3 md:mx-auto md:hidden px-3 mb-20">
        <div className="mb-8 p-2">
          <ProductImageCarousel images={product.imagePaths} />
        </div>

        {renderProductDetails(product)}

        {/* <div className="mt-10 w-full flex justify-center bottom-0">
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
                className="bg-white px-4 py-2 rounded-3xl text-[#F17E13] mx-1 text-lg border border-[#F17E13]"
              >
                Go to Cart
              </button>

              
            </div>
          )}
        </div> */}

        <hr className="my-5" />

        {renderUtilityImages()}

        <hr className="my-5" />

        {/* <div className="shadow-[-2px_2px_10px_0px_#00000010] py-2 px-3 rounded-lg">
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
        </div> */}

        {renderDescription(product)}

        {/* <div>
          <h1 className="text-lg pt-3 px-3">Similar Products</h1>
          <CategoryPage
            params={{ name: product.category, useInOtherPage: true }}
          />
        </div> */}
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex">
        <div className="w-1/3 h-screen bg-white fixed top-auto left-0 overflow-y-auto overflow-x-hidden">
          <div className="p-2 w-full">
            <div className="p-2">
              <ProductImageCarousel images={product.imagePaths} />
            </div>
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
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="w-2/3 h-screen ml-[33.33333333%] p-5">
          {renderProductDetails(product)}
          <hr className="my-5" />
          {renderUtilityImages()}

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

          {renderDescription(product)}
        </div>
      </div>
    </>
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
