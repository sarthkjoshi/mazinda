"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    } else {
      router.push("/user/auth/login");
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
            imageURI: product.imageURI,
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
      toast.info(
        "Hmm, seems like you aren't logged in. Log in and customize your cart."
      );
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
    <div>
      <div className="flex items-center justify-center mt-8">
        <div className="w-64 relative">
          <img
            src={isProductDefined ? product.imageURI : ""}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="bg-gray-50 h-full p-4 rounded-3xl mt-5">
        <span className="text-lg font-semibold">
          {isProductDefined ? product.productName : ""}
        </span>
        <div>
          <span className="text-[12px] text-gray-700">Price</span>
          {isPricingDefined ? (
            <div>
              <span className="text-xl">Rs {product.pricing.costPrice}/-</span>
              <span className="ml-4 text-[12px] text-gray-500">
                <s>Rs {product.pricing.mrp}/-</s>
              </span>
            </div>
          ) : (
            <div>No pricing information available</div>
          )}
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
                {addingItemToCartLoading ? (
                  "Adding to Cart..."
                ) : (
                  "Add to Cart"
                )}
              </button>
            ) : (
              <div className="bg-white px-3 py-2 rounded-3xl text-[#F17E13] mx-1 text-sm border border-[#F17E13]">
                ✔ Added to Cart
              </div>
            )}
          </div>
          <div className="mt-4 mb-12">
            <div className="text-[#F17E13] text-center text-lg">
              Description
            </div>
            <p className="text-sm">
              {isProductDefined ? product.description : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;