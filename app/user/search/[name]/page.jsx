"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductsLoading from "@/components/user/loading/ProductsLoading";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import ProductCard from "@/components/ProductCard";

const SearchPage = ({ params }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const product_name = decodeURIComponent(params.name);
  const [products, setProducts] = useState([]);

  const selectedLocation = useLocation();
  const locationLoading = useLocationLoading();

  const fetchData = async (searchQuery) => {
    const availablePincodes = selectedLocation.pincodes;

    const { data } = await axios.post(
      `/api/product/fetch-products?searchQuery=${searchQuery}`,
      {
        availablePincodes,
      }
    );
    setProducts(data.products);
    setPageLoading(false);
  };

  useEffect(() => {
    setPageLoading(true);
    if (Object.keys(selectedLocation).length) {
      fetchData(product_name);
    }
  }, [locationLoading, selectedLocation]);

  if (pageLoading) {
    return (
      <>
        <div className="text-center font-bold px-10">
          Search Results for "{product_name}"
        </div>
        <ProductsLoading />
      </>
    );
  }

  return (
      <>
        <div className="text-center font-bold px-10">
          Search Results for "{product_name}"
        </div>
        <div className="flex flex-wrap mt-4 justify-evenly mb-20">
          {products && products.map((product) => {
              return (
                <ProductCard key={product._id} product={product} />
              );
            })}
        </div>
      </>
  );
};

export default SearchPage;
