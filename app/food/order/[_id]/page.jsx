"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import OvalLoader from "@/components/Loading-Spinners/OvalLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { toast as mytoast } from "react-toastify";
const CanteenPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCampus = searchParams.get("campus");
  const { toast } = useToast();
  const [cart, setCart] = useState({});
  const [menu, setMenu] = useState({});
  const [storeName, setStoreName] = useState("");
  const [minOrder, setMinOrder] = useState(0);
  const [fetchingData, setFetchingData] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter menu based on the search query
  const filteredMenu = Object.fromEntries(
    Object.entries(menu).map(([category, products]) => [
      category,
      products.filter(
        (product) =>
          product !== null &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    ])
  );

  const updateCart = async (cart) => {
    const token = Cookies.get("user_token");
    try {
      await axios.put(`/api/vendor/updatecart`, { token, cart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("user_token");

      if (token) {
        try {
          const response = await axios.post(`/api/vendor/fetchcart`, { token });
          const json = response.data;

          if (json.success) {
            setCart(json.cart || {}); // Initialize cart as an empty object if it's null
          } else {
            console.error("Failed to fetch cart:", json.message);
          }
        } catch (error) {
          console.error("An error occurred while fetching cart:", error);
        }
      } else {
        setCart({});
      }
    };

    fetchCartData();

    const fetchVendor = async () => {
      console.log("here");
      try {
        const response = await axios.post(`/api/vendor/fetch-vendor-by-id`, {
          _id: params._id,
        });
        const json = await response.data;

        if (json.success) {
          setMenu(json.vendor.menu || {});
          setStoreName(json.vendor.name);
          setMinOrder(json.vendor.minOrders[selectedCampus]);
        } else {
          console.error("Failed to fetch menu:", json.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchVendor();
  }, [params._id]);

  const [showAlert, setShowAlert] = useState(false); // State to control the custom alert
  const [alertMessage, setAlertMessage] = useState(""); // Message to display in the alert

  const handleClearCart = () => {
    setCart({}); // Clear the cart
    updateCart({}); // Update the cart on the server
    setShowAlert(false); // Close the alert
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert
  };

  const toggleImageSize = (imageName) => {
    setSelectedImage(selectedImage === imageName ? null : imageName);
  };

  const addToCart = (item) => {
    try {
      // check login
      const userToken = Cookies.get("user_token");
      if (!userToken) {
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
      } else {
        // Check if the cart is associated with a vendor
        if (Object.keys(cart).length > 0) {
          const vendorNameInCart = Object.values(cart)[0].vendorName;
          if (vendorNameInCart !== storeName) {
            // Show the custom alert when trying to add items from different vendors
            setAlertMessage(
              "You can't add items from different restaurant. Do you want to clear the cart?"
            );
            setShowAlert(true);
            return;
          }
        }

        // Check if the item is already in the cart
        if (item.name in cart) {
          // If the item is already in the cart, update its quantity
          const updatedCart = { ...cart };
          updatedCart[item.name].quantity += 1;
          setCart(updatedCart);
          updateCart(updatedCart);
        } else {
          // If the item is not in the cart, add it
          const newItem = {
            name: item.name,
            quantity: 1,
            price: item.price,
            vendorName: storeName,
          };
          const newCart = { ...cart, [item.name]: newItem };
          setCart(newCart);
          updateCart(newCart);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const decreaseQuantity = (itemName) => {
    try {
      if (cart[itemName]) {
        const updatedCart = { ...cart };
        if (updatedCart[itemName].quantity === 1) {
          // Remove the item from the cart if the quantity is 1
          delete updatedCart[itemName];
        } else {
          updatedCart[itemName].quantity -= 1;
        }
        setCart(updatedCart);
        updateCart(updatedCart);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 md:w-1/2">
      <h1 className="text-xl font-semibold text-center my-2">{storeName}</h1>
      <div className="mb-5 sticky top-0 bg-white rounded-xl">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 z-50"
        />
      </div>

      {fetchingData ? (
        <OvalLoader />
      ) : Object.entries(filteredMenu).length > 0 ? (
        <div className="mb-16">
          {Object.entries(filteredMenu).map(
            ([category, products]) =>
              // Check if the category has any products before rendering
              products.length > 0 && (
                <div
                  key={category}
                  className="mb-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 rounded-md"
                >
                  <h3 className="text-lg font-semibold ml-2 mb-2 underline">
                    {category}
                  </h3>
                  <ul className="list-disc ml-6">
                    {products
                      .filter((product) => product !== null)
                      .map((product, index) => (
                        <li
                          key={index}
                          disabled={product.availability === "over"}
                          className={`mb-2 list-none flex justify-between items-center ${
                            product.availability === "over" ? "opacity-50" : ""
                          }`}
                        >
                          <span className="flex items-center justify-center">
                            {product.imageName && product.imageName !== "" ? (
                              <img
                                src={product.imageName}
                                alt=""
                                className={`rounded-md mr-4 w-12 h-12 ${
                                  selectedImage === product.imageName
                                    ? "w-52 h-52 absolute"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleImageSize(product.imageName)
                                }
                              />
                            ) : null}
                            {product.name}
                            <span
                              className={
                                product.categoryType === "nonveg"
                                  ? "bg-red-500 p-1 text-white rounded-lg ml-2 text-[10px]"
                                  : "bg-white p-1 text-white rounded-lg ml-2 text-[10px]"
                              }
                            >
                              {product.categoryType}
                            </span>
                          </span>
                          <div className="flex">
                            <div
                              id="quantityPill"
                              className={`flex mr-2 scale-[0.85] border ${
                                cart &&
                                cart[product.name] &&
                                cart[product.name].quantity > 0
                                  ? "border-gray-300 bg-gray-200" // Apply the grey background and different border for non-zero quantity
                                  : "border-gray-300" // Default border for zero quantity
                              } rounded-md h-[28px]`}
                            >
                              <button
                                disabled={product.availability === "over"}
                                className="pl-3 pr-1 rounded-l-xl"
                                onClick={() => decreaseQuantity(product.name)}
                              >
                                -
                              </button>
                              <span className="px-2 border border-gray-100">
                                {cart && cart[product.name]
                                  ? cart[product.name].quantity
                                  : "0"}
                              </span>
                              <button
                                disabled={product.availability === "over"}
                                className="pr-2 pl-1 rounded-r-xl"
                                onClick={() => addToCart(product)}
                              >
                                +
                              </button>
                            </div>
                            <span className="w-[40px]">₹{product.price}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )
          )}
        </div>
      ) : (
        <p className="text-center">No matching items found.</p>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white text-center">
        {cart && Object.keys(cart).length > 0 ? (
          <button
            onClick={() => {
              let total = 0;
              Object.keys(cart).map((key) => {
                total += cart[key].quantity * cart[key].price;
                if (total >= minOrder) {
                  router.push(
                    `${params._id}/checkout?campus=${selectedCampus}`
                  );
                } else {
                  mytoast.info(
                    `Based on your location (${selectedCampus}), the minimum order value for ${storeName} is ₹${minOrder}`,
                    {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    }
                  );
                }
              });
            }}
            className="md:w-1/2 w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Checkout
          </button>
        ) : (
          <button
            className="md:w-1/2 w-full bg-[#e0e0e0] text-[#a6a6a6] font-semibold py-2 rounded-lg focus:outline-none"
            disabled
          >
            Checkout
          </button>
        )}
      </div>

      {/* Custom Alert */}
      <Modal
        isOpen={showAlert}
        onRequestClose={handleCloseAlert}
        style={{
          content: {
            width: "300px",
            height: "200px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          },
        }}
      >
        <p>{alertMessage}</p>
        <div style={{ marginTop: "20px" }}>
          <button
            className="bg-black rounded-md text-white px-4 py-2 mx-2"
            onClick={handleClearCart}
          >
            {" "}
            Clear{" "}
          </button>
          <button
            className="mx-2 border border-gray-200 px-4 py-2 rounded-md"
            onClick={handleCloseAlert}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CanteenPage;
