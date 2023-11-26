"use client";

import { useEffect, useState } from "react";
import ProductsLoading from "@/components/user/loading/ProductsLoading";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const page = ({ params }) => {
  const categoryName = params.name;

  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.post(
      `/api/product/fetch-products?category=${categoryName}`
    );
    setProducts(data.products);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (pageLoading) {
    return (
      <>
        <h1 className="text-center text-2xl">
          Browsing <span className="font-semibold">"{categoryName}"</span>
        </h1>
        <ProductsLoading />
      </>
    );
  }

  return (
    <div className="mb-20">
      <h1 className="text-center text-2xl">
        Browsing <span className="font-semibold">"{categoryName}"</span>
      </h1>
      <div className="flex flex-wrap mt-4 justify-evenly">
        {products.length ? (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        ) : (
          <div>Coming Soon</div>
        )}
      </div>
    </div>
  );
};

export default page;
