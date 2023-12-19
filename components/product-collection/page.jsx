"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import ProductCard from "@/components/utility/ProductCard";

const ProductCollection = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const selectedLocation = useLocation();
  const locationLoading = useLocationLoading();

  const fetchData = async () => {
    const availablePincodes = selectedLocation.pincodes;

    const { data } = await axios.post(
      `/api/product/fetch-products?filter=${filter}`,
      {
        availablePincodes,
      }
    );
    if (data.success) {
      setProducts(data.products);
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
      <div className="flex overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          return (
            <div key={num}>
              <Skeleton className="w-[150px] h-[208px] md:w-[200px] md:h-[240px] m-2 rounded-lg" />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="flex overflow-x-auto">
        <div className="flex">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCollection;
