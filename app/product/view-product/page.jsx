"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const ViewProduct = () => {
  const searchParams = useSearchParams();
  const product_id = searchParams.get("id");
  const [product, setProduct] = useState({});

  const fetchProduct = async (id) => {
    const response = await axios.post("/api/product/fetch-product-by-id", {
      id,
    });
    console.log(response.data.product);
    setProduct(response.data.product);
  };

  useEffect(() => {
    fetchProduct(product_id);
  }, []);

  // Check if product and pricing are defined
  const isProductDefined = Object.keys(product).length > 0;
  const isPricingDefined = isProductDefined && product.pricing;

  return (
    <div>
      <div className="flex items-center justify-center mt-8">
        <div className="w-64 relative">
          <img
            src={isProductDefined ? product.imageURI : ""}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="bg-gray-50 h-full p-4 rounded-3xl mt-5">
        <span className="text-lg font-semibold">
          {isProductDefined ? product.productName : ""}
        </span>
        <div>
          <span className="text-[12px] text-gray-700">Price</span>
          {isPricingDefined ? (
            <div>
              <span className="text-xl">Rs {product.pricing.costPrice}/-</span>
              <span className="ml-4 line-through text-[12px] text-gray-500">
                Rs {product.pricing.mrp}/-
              </span>
            </div>
          ) : (
            <div>No pricing information available</div>
          )}
          <div className="mt-4 w-full flex justify-center">
            <button className="bg-[#F17E13] px-3 py-2 rounded-lg text-white mx-1 text-sm">
              Buy Now
            </button>

            <button className="bg-white px-3 py-2 rounded-lg text-[#F17E13] mx-1 text-sm border border-[#F17E13]">
              Add to Cart
            </button>
          </div>
          <div className="mt-4 mb-12">
            <div className="text-[#F17E13] text-center text-lg">Description</div>
            <p className="text-sm">{isProductDefined ? product.description : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;