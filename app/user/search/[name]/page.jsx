"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductsLoading from "@/components/loading/ProductsLoading";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import ProductCard from "@/components/utility/ProductCard";
import NoResultImage from "@/public/no-result-vector.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";

const SearchPage = ({ params }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const product_name = decodeURIComponent(params.name);
  const [products, setProducts] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [querySubmitLoading, setQuerySubmitLoading] = useState(false);

  const { toast } = useToast();

  const selectedLocation = useLocation();
  const locationLoading = useLocationLoading();

  const fetchData = async (searchQuery) => {
    const availablePincodes = selectedLocation.pincodes;

    const userToken = Cookies.get("user_token");
    if (userToken) {
      setUserLoggedIn(true);
    }

    const { data } = await axios.post(
      `/api/product/fetch-products?searchQuery=${searchQuery}`,
      {
        availablePincodes,
      }
    );

    if (data.success) {
      setProducts(data.products); // Set the search products
    }
    setPageLoading(false);

    // If products are available with this search query, then add them to the SearchQueryTrack for service improvements
    // if (Object.keys(data.products).length) {
    //   await axios.post('/api/track/search-details', { userToken: Cookies.get('user_token'), searchQuery: product_name });
    // }
  };

  const handleReportSearch = async () => {
    setQuerySubmitLoading(true);
    await axios.post("/api/whatsapp/msg-to-team/user-search-query", {
      userToken: Cookies.get("user_token"),
      search_query: product_name,
    });
    toast({
      title: "Query Reported",
      description:
        "Your query has been reported. The team will respond to you shortly",
    });
    setQuerySubmitLoading(false);
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
        {products.length ? `Search Results for "${product_name}"` : null}
      </div>
      <div className="flex flex-wrap mt-4 justify-evenly mb-20">
        {products.length ? (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image src={NoResultImage} alt="No Result" />
              <p className="text-xl mb-4">
                No results found for "{product_name}"
              </p>
              <p className="px-3 text-gray-600 text-center">
                Please check the spelling or try searching for something else
              </p>
            </div>

            {userLoggedIn ? (
              <div className="border rounded-md p-3 mt-16 flex flex-col items-center justify-center mx-3">
                <span className="text-center">
                  If you want <strong>"{product_name}"</strong> to be added
                  shortly to Mazinda, kindly report here.
                </span>
                <button
                  onClick={handleReportSearch}
                  className={`mt-2 text-white px-2 py-1 rounded-lg shadow ${
                    !querySubmitLoading ? "bg-orange-500" : "bg-gray-700"
                  }`}
                >
                  {!querySubmitLoading ? "Report" : "Reporting..."}
                </button>
              </div>
            ) : (
              <div className="border rounded-md p-3 mt-16 flex flex-col items-center justify-center mx-3">
                <span className="text-center">
                  If you want <strong>"{product_name}"</strong> to be added
                  shortly to Mazinda, kindly text us here.
                </span>
                <a
                  href={`https://api.whatsapp.com/send?phone=917876901177&text=Hey Mazinda,%20I%20searched%20for%20"${product_name}"%20but%20no%20results%20were%20found%20%20Kindly%20get%20the%20product%20available%20as%20soon%20as%20possible.`}
                  className="mt-2 px-2 rounded-lg border flex items-center justify-center text-gray-600"
                >
                  <span>Open in</span>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG_Qlic-yLMcHdWinAWUOHMs_GYSF8FfjjQtHZD6Xt3hsOeTlD1rYWRxMKPJoJ9Dn6L04&usqp=CAU"
                    className="h-14 ml-2"
                    alt="Whatsapp"
                  />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
