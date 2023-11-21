"use client";

import { useEffect, useState } from "react";
import ProductsLoading from "@/components/user/loading/ProductsLoading";
import axios from "axios";
import Link from "next/link";

const page = ({ params }) => {
  const categoryName = params.name;

  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await axios.post("/api/product/fetch-category-products", {
      categoryName,
    });
    setProducts(response.data.categoryProducts);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (pageLoading) {
    return (
      <>
        <h1 className="text-center text-2xl">
          Browsing{" "}
          <span className="font-semibold">"{categoryName}"</span>
        </h1>
        <ProductsLoading />
      </>
    );
  }

  return (
    <div className="mb-20">
      <h1 className="text-center text-2xl">
        Browsing{" "}
        <span className="font-semibold">"{categoryName}"</span>
      </h1>
      <div className="flex flex-wrap mt-4 justify-center">
        {products.length ? (
          products.map((product) => {
            return (
              <div
                key={product._id}
                className="w-40 md:w-52 md:p-2 border shadow m-2 rounded-md"
              >
                <Link
                  href={`/product/view-product?id=${product._id}`}
                  className="px-2 py-1 flex items-center justify-center cursor-pointer"
                >
                  <img
                    className="rounded-lg w-full"
                    src={product.imagePaths[0]}
                    alt="product"
                  />
                </Link>

                <div>
                  <Link
                    href={`/product/view-product?id=${product._id}`}
                    className="px-2 py-1 flex mt-2 justify-between"
                  >
                    <span className="cursor-pointer text-sm mx-1">
                      {product.productName.slice(0, 25)}...
                    </span>

                    <div className="flex flex-col ml-2">
                      <span className="font-bold self-end text-[15px]">
                        ₹{product.pricing.costPrice}
                      </span>
                      <span className="text-[10px] line-through text-gray-500 self-end">
                        ₹{product.pricing.mrp}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div>Coming Soon</div>
        )}
      </div>
    </div>
  );
};

export default page;
