"use client";

import { useEffect, useState } from "react";
import ProductsLoading from "@/components/user/loading/ProductsLoading";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
                className="w-40 md:w-52 md:p-2 border shadow m-2 rounded-md"
              >
                <Link href={`/product/view-product?id=${product._id}`} className="px-2 py-1 flex items-center justify-center cursor-pointer">
                  <img
                    className="rounded-lg w-full"
                    src={product.imagePaths[0]}
                    alt="product"
                  />
                </Link>

                <div>
                  <Link href={`/product/view-product?id=${product._id}`} className="px-2 py-1 flex mt-2 justify-between">
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

                  {/* <div className="flex mt-2 md:mt-5 w-full justify-between p-1 mb-2">
                    <div className="w-full cursor-pointer font-semibold text-[9px] md:text-[0.7em] border border-[#F17E13] p-1 rounded-full shadow flex items-center justify-center">
                      Add to Cart
                    </div>
                    <div className="w-full cursor-pointer font-semibold text-[9px] md:text-[0.7em] bg-[#F17E13] text-white p-1 rounded-full shadow flex items-center justify-center">
                      Buy Now
                    </div>
                  </div> */}
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
