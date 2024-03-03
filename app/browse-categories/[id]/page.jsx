"use client";

import { useEffect, useState } from "react";
import ProductsLoading from "@/components/loading/ProductsLoading";
import axios from "axios";
import ProductCard from "@/components/utility/ProductCard";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";

const CategoryPage = ({ params }) => {
  const category_id = params.id;

  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const selectedLocation = useLocation();
  const locationLoading = useLocationLoading();

  const fetchData = async () => {
    const availablePincodes = selectedLocation.pincodes;
    const { data } = await axios.post(
      `/api/product/fetch-products?category_id=${category_id}`,
      { availablePincodes }
    );
    setProducts(data.products);
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
        <h1 className="text-center text-2xl">Please Wait ...</h1>
        <ProductsLoading />
      </>
    );
  }

  return (
    <div className="mb-20">
      {!params.useInOtherPage ? (
        <h1 className="text-center text-2xl">
          Browsing{" "}
          <span className="font-semibold">"{products[0].category}"</span>
        </h1>
      ) : null}
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

export default CategoryPage;
