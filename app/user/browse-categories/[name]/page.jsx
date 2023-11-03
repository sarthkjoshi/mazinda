"use client";

import { useEffect, useState } from "react";
import ProductsLoading from "@/components/user/loading/ProductsLoading";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const categoryName = params.name;
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await axios.post("/api/product/fetch-category-products", { categoryName });
    setProducts(response.data.categoryProducts);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl">Browse Categories</h1>
      {pageLoading ? (
        <ProductsLoading />
      ) : (
        <div className="flex flex-wrap mt-4 justify-center">
          {products.length ? products.map((product) => {
            return (
              <div
                key={product._id}
                className="w-40 p-2 bg-gray-50 m-2 rounded-md"
              >
                <div
                  className="h-44 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    router.push(`/product/view-product?id=${product._id}`);
                  }}
                >
                  <img
                    className="rounded-lg w-full"
                    src={product.imageURI}
                    alt="product"
                  />
                </div>

                <div>
                  <div className="mt-2">
                    <span
                      className="font-semibold cursor-pointer"
                      onClick={() => {
                        router.push(`/product/view-product?id=${product._id}`);
                      }}
                    >
                      {product.productName.slice(0, 28)}...
                    </span>
                  </div>

                  <div className="flex flex-col mt-2">
                    <span className="">₹{product.pricing.costPrice}</span>
                    <span className="text-[10px] line-through text-gray-500">
                      ₹{product.pricing.mrp}
                    </span>
                  </div>

                  <div className="flex mt-2 w-full">
                    <div className="cursor-pointer font-semibold mx-1 text-[0.6em] border border-[#F17E13] px-2 py-1 rounded-full shadow flex items-center justify-center">
                      Add to Cart
                    </div>
                    <div className="cursor-pointer font-semibold text-[0.6em] bg-[#F17E13] text-white px-2 py-1 rounded-full shadow flex items-center justify-center">
                      Buy Now
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : <div>Coming Soon</div>}
        </div>
      )}
    </>
  );
};

export default page;