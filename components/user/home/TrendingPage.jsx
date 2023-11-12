"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Image from "next/image";
import homepage_image_loading from "@/public/loading/homepage_image_loading.png";

const TrendingPage = () => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.post("/api/product/fetch-trending-products");
    if (response.data.success) {
      setProducts(response.data.products);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="ml-5 text-lg font-bold">Trending Now</h1>
      <div className="flex overflow-y-scroll">
        {!pageLoading ? (
          products.map((product) => {
            return (
              <Link
                key={product._id}
                href={`/product/view-product?id=${product._id}`}
                className="p-2 m-2 rounded-md border shadow w-2/5 md:w-fit"
              >
                <div className="flex items-center justify-center cursor-pointer">
                  <img
                    className="rounded-lg w-32 md:w-44"
                    src={product.imagePaths[0]}
                    alt="product"
                  />
                </div>

                <div className="flex mt-2 justify-between items-center">
                  <span className="cursor-pointer text-[12px] font-bold mx-1">
                    {product.productName.slice(0, 20)}...
                  </span>

                  <div className="flex flex-col ml-2">
                    <span className="font-bold self-end text-[15px]">
                      ₹{product.pricing.salesPrice}
                    </span>
                    <span className="text-[10px] line-through text-gray-500 self-end">
                      ₹{product.pricing.mrp}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex overflow-y-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              return (
                <Image
                  src={homepage_image_loading}
                  key={num}
                  className="m-2"
                  alt="loading"
                  width={128}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingPage;
