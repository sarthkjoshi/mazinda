"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import ProductCard from "@/components/ProductCard";

const ProductCollection = ({filter}) => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const selectedLocation = useLocation();
  const locationLoading = useLocationLoading();

  const fetchData = async () => {
    const availablePincodes = selectedLocation.pincodes;

    const response = await axios.post(
      `/api/product/fetch-products?filter=${filter}`,
      {
        availablePincodes,
      }
    );
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
        <h1 className="ml-5 text-lg font-semibold">{filter}</h1>
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
      <h1 className="ml-5 text-lg font-semibold">{filter}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCollection;