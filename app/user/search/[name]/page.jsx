"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductsLoading from "@/components/loading/ProductsLoading";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import ProductCard from "@/components/utility/ProductCard";
import NoResultImage from "@/public/no-result-vector.png";
import Image from "next/image";

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
        {products.length ? (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={NoResultImage} alt="No Result" />
            <p className="text-xl mb-5">No result found for "{product_name}"</p>
            <p className="px-3">
              Please check the spelling or try searching for something else
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
