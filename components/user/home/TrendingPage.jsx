"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import Image from "next/image";
import homepage_image_loading from "@/public/loading/homepage_image_loading.png";

import { Skeleton } from "@/components/ui/skeleton";

const TrendingPage = () => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const selectedLocation = useLocation();
  const locationLoading = useLocationLoading();

  const fetchData = async () => {
    const availablePincodes = selectedLocation.pincodes;

    const response = await axios.post("/api/product/fetch-trending-products", {
      availablePincodes,
    });
    if (response.data.success) {
      setProducts(response.data.products);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    if (Object.keys(selectedLocation).length !== 0) {
      fetchData();
    }
  }, [selectedLocation, locationLoading]);

  if (pageLoading) {
    return (
      <>
        <h1 className="ml-5 text-lg font-semibold">Trending Now</h1>
        <div className="flex overflow-y-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            return (
              <div key={num}>
                <Skeleton className="w-[150px] h-[208px] md:w-[200px] md:h-[240px] m-2 rounded-lg" />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="ml-5 text-lg font-semibold">Trending Now</h1>
      <div className="flex overflow-x-auto">
        <div className="flex">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/view-product?id=${product._id}`}
              className="p-2 m-2 rounded-md border shadow w-40 md:w-[200px] bg-white"
            >
              <div className="flex items-center justify-center cursor-pointer">
                <img
                  className="rounded-lg w-32 md:w-44"
                  src={product.imagePaths[0]}
                  alt="product"
                />
              </div>

              <div className="flex mt-2 justify-between items-center">
              <span className="cursor-pointer text-sm mx-1">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingPage;
