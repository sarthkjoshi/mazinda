"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/utility/ProductCard";
import OvalLoader from "@/components/Loading-Spinners/OvalLoader";

const ViewStore = ({ params }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [products, setProducts] = useState({});
  const [store, setStore] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [storeFollowing, setStoreFollowing] = useState(false);

  const fetchStore = async () => {
    const { data } = await axios.post("/api/store/fetch-store-by-name", {
      store_name: params.store_name,
    });

    if (data.success) {
      setStore(data.store);
      const followers = data.store.followers;
    } else {
      setPageLoading(false);
    }
    // const userToken = Cookies.get("user_token");
    // if (userToken) {
    //   const { data } = await axios.post("/api/user/fetch-user", { userToken });
    //   if (followers.includes(data.user._id)) {
    //     setStoreFollowing(true);
    //   } else {
    //     setStoreFollowing(false);
    //   }
    // }
  };

  const fetchStoreProducts = async (store_id) => {
    const { data } = await axios.post("/api/store/fetch-store-products", {
      storeId: store_id,
    });
    setProducts(data.products);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchStore();
  }, []);

  useEffect(() => {
    if (store && Object.keys(store).length) {
      fetchStoreProducts(store._id);
    }
  }, [store]);

  //   const followStore = async (store) => {
  //     const userToken = Cookies.get("user_token");
  //     if (userToken) {
  //       const { data } = await axios.post("/api/user/fetch-user", { userToken });
  //       try {
  //         await axios.post("/api/store/update-store-followers", {
  //           storeId: store._id,
  //           userId: data.user._id,
  //         });
  //         fetchStore(store_id);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else {
  //       toast({
  //         title: "New to Mazinda?",
  //         description:
  //           "Signup/Login now to customize your cart and experience shopping like never before!",
  //         action: (
  //           <ToastAction
  //             altText="Try again"
  //             onClick={() => router.push("/user/auth/login")}
  //           >
  //             Login
  //           </ToastAction>
  //         ),
  //       });
  //     }
  //   };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <OvalLoader />
      </div>
    );
  }

  if (store && !Object.keys(store).length) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="font-extrabold text-5xl">404</span>
          <span className="text-gray-500">Store Not Found</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center">
          <div className="w-full mb-2">
            <div className="w-fit mx-auto flex flex-col items-center justify-center border py-3 px-8 rounded-lg shadow">
              <div className="mb-5">
                <h1 className="text-2xl">{store.storeName}</h1>
                <span className="text-sm text-gray-500">
                  {store.storeAddress.city}, {store.storeAddress.pincode}
                </span>
              </div>
              <div className="flex justify-center">
                {/* Commented out Rating section */}
                {/* <div className="mx-4">
                    <p className="text-center font-bold">4.5/5</p>
                    <p className="text-center">Rating</p>
                  </div> */}
                <div className="mx-4">
                  <p className="text-center font-bold">
                    {store.followers.length}
                  </p>
                  <p className="text-center">Followers</p>
                </div>
                <div className="mx-4">
                  <p className="text-center font-bold">{products.length}</p>
                  <p className="text-center">Products</p>
                </div>
              </div>
              {/* <div className="mt-8">
                <button
                  onClick={() => followStore(store)}
                  className={`border border-[#F17E13] text-[#F17E13] px-2 py-1 rounded-md ${
                    storeFollowing ? "bg-[#fce5d0]" : ""
                  }`}
                >
                  {storeFollowing ? "Following" : "Follow"}
                </button>
              </div> */}
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col items-center justify-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStore;
