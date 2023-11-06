"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import Image from "next/image";
import ImageLoading from "@/public/loading/ImageLoading.png";
import PriceLoading from "@/public/loading/PricingLoading.png";
import ButtonLoading from "@/public/loading/ButtonLoading.png";
import SmallRectangleLoading from "@/public/loading/SmallRectangleLoading.png";
import Carousel from "@/components/utils/Carousel";

const ViewProduct = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const product_id = searchParams.get("id");

  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [addingItemToCartLoading, setAddingItemToCartLoading] = useState(false);

  const fetchProduct = async (id) => {
    const response = await axios.post("/api/product/fetch-product-by-id", {
      id,
    });
    setProduct(response.data.product);
  };

  const fetchUserCart = async () => {
    const userToken = Cookies.get("user_token");
    if (userToken) {
      const response = await axios.post("/api/user/fetch-user", { userToken });
      setCart(response.data.user.cart);
    }
  };

  useEffect(() => {
    fetchProduct(product_id);
    fetchUserCart();
  }, []);

  const handleAddToCart = async (product) => {
    setAddingItemToCartLoading(true);
    const userToken = Cookies.get("user_token");

    if (userToken) {
      try {
        const response = await axios.post("/api/user/cart/add-product", {
          itemInfo: {
            productID: product._id,
            productName: product.productName,
            quantity: 1,
            imageNames: product.imageNames,
            storeID: product.storeId,
            costPrice: product.pricing.costPrice,
            mrp: product.pricing.mrp,
          },
          userToken,
        });
        if (response.data.success) {
          setIsProductInCart(true); // Update the state here
        }
      } catch (err) {
        console.log("An error occurred", err);
      }
    } else {
      toast.info("Log in to customize your cart.");
      router.push("/user/auth/login");
    }
    setAddingItemToCartLoading(false);
  };

  // Check if product and pricing are defined
  const isProductDefined = Object.keys(product).length > 0;
  const isPricingDefined = isProductDefined && product.pricing;

  // Check if the product is in the cart
  useEffect(() => {
    setIsProductInCart(cart.some((item) => item.productID === product._id));
  }, [cart, product]);

  return (
    <>
      <div className="md:w-1/2 lg:w-1/3 md:mx-auto">
        <div>
          {isProductDefined ? (
            <div className="p-2">

            <Carousel arr={product.imageNames} />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Image src={ImageLoading} alt="" />
            </div>
          )}
        </div>

        <div className="bg-gray-50 h-full p-4 rounded-3xl mt-5">
          <span className="text-lg font-semibold">
            {isProductDefined ? product.productName : ""}
          </span>
          <div>
            <span className="text-[12px] text-gray-700">
              {isProductDefined ? (
                "Price"
              ) : (
                <Image className="mb-3" src={SmallRectangleLoading} alt="" />
              )}
            </span>
            {isPricingDefined ? (
              <div>
                <span className="text-xl">
                  Rs {product.pricing.costPrice}/-
                </span>
                <span className="ml-4 text-[12px] text-gray-500">
                  <s>Rs {product.pricing.mrp}/-</s>
                </span>
              </div>
            ) : (
              <Image src={PriceLoading} alt="" />
            )}

            {isProductDefined ? (
              <div className="mt-4 w-full flex justify-center">
                <button className="bg-[#F17E13] px-5 py-2 rounded-3xl text-white mx-1 text-sm font-bold">
                  Buy Now
                </button>

                {!isProductInCart ? (
                  <button
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                    className="bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]"
                  >
                    {addingItemToCartLoading
                      ? "Adding to Cart..."
                      : "Add to Cart"}
                  </button>
                ) : (
                  <Link
                    href="/user/my-cart"
                    className="cursor-pointer bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]"
                  >
                    ✔ Added to Cart
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center my-5">
                <Image className="mx-2" src={ButtonLoading} alt="" />
                <Image className="mx-2" src={ButtonLoading} alt="" />
              </div>
            )}

            {isProductDefined ? (
              <div className="mt-4 mb-12">
                <div className="text-[#F17E13] text-center text-lg">
                  Description
                </div>
                <p className="text-sm">
                  {isProductDefined ? product.description : ""}
                </p>
              </div>
            ) : (
              <Image src={PriceLoading} alt="" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
