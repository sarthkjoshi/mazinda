"use client";

import React from "react";

const Actions = () => {
  return (
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
            className="bg-white px-4 py-2 rounded-3xl text-[#F17E13] mx-1 text-lg border border-[#F17E13]"
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Actions;
