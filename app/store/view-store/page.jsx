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

const ViewStore = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const router = useRouter();
  const store_id = searchParams.get("id");

  const [products, setProducts] = useState({});
  const [store, setStore] = useState({});
  const [storeFollowers, setStoreFollowers] = useState(0);
  const [storeProducts, setStoreProducts] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [storeFollowing, setStoreFollowing] = useState(false);



  const fetchStore = async (store_id) => {
    const { data } = await axios.post("/api/store/fetch-store", {
      storeId: store_id,
    });
    setStore(data.store);
    setStoreFollowers(data.store.followers.length)
    const followers = data.store.followers;
    const userToken = Cookies.get("user_token");
    if (userToken) {
      const { data } = await axios.post("/api/user/fetch-user", { userToken });
      if (followers.includes(data.user._id)) {
          setStoreFollowing(true)
      } else {
          setStoreFollowing(false)
      }
    }
  };

  const fetchStoreProducts = async (store_id) => {
    const { data } = await axios.post("/api/store/fetch-store-products", {
      storeId: store_id,
    });
    setStoreProducts(data.products.length);
    setProducts(data.products);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchStore(store_id);
    fetchStoreProducts(store_id);
  }, [store_id,storeFollowing]);

  const followStore = async (store) => {
    const userToken = Cookies.get("user_token");
    if (userToken) {
      const { data } = await axios.post("/api/user/fetch-user", { userToken });
      try {
        await axios.post("/api/store/update-store-followers", {
          storeId: store._id,
          userId:data.user._id,
        });
        fetchStore(store_id);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast({
        title: "New to Mazinda?",
        description:
          "Signup/Login now to customize your cart and experience shopping like never before!",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => router.push("/user/auth/login")}
          >
            Login
          </ToastAction>
        ),
      });
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <OvalLoader />
      </div>
    );
  }

  return (
    <>
      {/* Mobile Version */}
      <div className="md:w-1/2 lg:w-1/3 md:mx-auto md:hidden px-3 mb-20">
          <div className="flex flex-col items-center">
              <div className="w-full mb-8">
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="mb-8">
                    <h1 className="text-2xl">{store.storeName}</h1>
                  </div>
                  <div className="flex justify-center">
                    {/* Commented out Rating section */}
                    {/* <div className="mx-4">
                      <p className="text-center font-bold">4.5/5</p>
                      <p className="text-center">Rating</p>
                    </div> */}
                    <div className="mx-4">
                      <p className="text-center font-bold">{storeFollowers}</p>
                      <p className="text-center">Followers</p>
                    </div>
                    <div className="mx-4">
                      <p className="text-center font-bold">{storeProducts}</p>
                      <p className="text-center">Products</p>
                    </div>
                  </div>
                  <div className="mt-8">
                      <button onClick={() => followStore(store)} className={`border border-[#F17E13] text-[#F17E13] px-2 py-1 rounded-md ${storeFollowing ? 'bg-[#fce5d0]' : ''}`}>
                        {storeFollowing ? 'Following' : 'Follow'}
                      </button>
                  </div>
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

      {/* Desktop Version */}
        <div className="hidden md:flex">
          <div className="flex flex-col items-center">
            <div className="w-full mb-8">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="mb-8">
                  <h1 className="text-2xl">{store.storeName}</h1>
                </div>
                <div className="flex justify-center">
                  {/* Commented out Rating section */}
                  {/* <div className="mx-4">
                    <p className="text-center font-bold">4.5/5</p>
                    <p className="text-center">Rating</p>
                  </div> */}
                  <div className="mx-4">
                    <p className="text-center font-bold">{storeFollowers}</p>
                    <p className="text-center">Followers</p>
                  </div>
                  <div className="mx-4">
                    <p className="text-center font-bold">{storeProducts}</p>
                    <p className="text-center">Products</p>
                  </div>
                </div>
                <div className="mt-8">
                    <button onClick={() => followStore(store)} className={`border border-[#F17E13] text-[#F17E13] px-2 py-1 rounded-md ${storeFollowing ? 'bg-[#fce5d0]' : ''}`}>
                      {storeFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
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
