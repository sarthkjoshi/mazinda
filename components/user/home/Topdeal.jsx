"use client";

import { useEffect, useState } from "react";
import OvalLoader from "@/components/admin/utility/OvalLoader";
import axios from "axios";
import Link from "next/link";

const Topdeal = () => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.post("/api/product/fetch-top-deal-products");
    console.log(response.data.products);
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
      <h1 className="ml-5 text-lg font-bold">Top Deals</h1>
      <div className="flex overflow-y-scroll">
        {!pageLoading ? (
          products.map((product) => {
            return (
              <Link
                key={product._id}
                href={`/product/view-product?id=${product._id}`}
                className="p-2 m-2 rounded-md border shadow"
              >
                <div
                  className="flex items-center justify-center cursor-pointer"
                >
                  <img
                    className="rounded-lg w-32 h-32"
                    src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/${product.imageNames[0]}`}
                    alt="product"
                  />
                </div>

                <div className="flex mt-2 justify-between items-center">
                  <span
                    className="cursor-pointer text-[12px] font-bold mx-1"
                  >
                    {product.productName.slice(0, 20)}...
                  </span>

                  <div className="flex flex-col ml-2">
                    <span className="font-bold self-end text-[15px]">₹{product.pricing.costPrice}</span>
                    <span className="text-[10px] line-through text-gray-500 self-end">
                      ₹{product.pricing.mrp}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <OvalLoader />
        )}
      </div>
    </>
  );
};

export default Topdeal;
