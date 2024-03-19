"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Script from "next/script";
import OvalLoader from "@/components/Loading-Spinners/OvalLoader";
import Modal from "react-modal";
import Cookies from "js-cookie";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const CheckoutPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCampus = searchParams.get("campus");
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [cartLoading, setCartLoading] = useState(true);
  const [externalDeliveryRequired, setExternalDeliveryRequired] =
    useState(false);
  const [orderPlaceButtonLoading, setOrderPlaceButtonLoading] = useState(false);

  const [cutleryQuantity, setCutleryQuantity] = useState(1);

  const [address, setAddress] = useState({
    hostel: "",
    campus: selectedCampus,
    phoneNumber: "",
    instructions: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("payondelivery");

  const [vendorData, setVendorData] = useState({
    deliveryRequirements: {},
    deliveryCharges: {},
    serviceCharges: "",
    packingHandlingCharges: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [packagingAndHandlingCharges, serviceCharges] = [3.5, 3.5];
  const [deliveryCharge, setDeliveryCharge] = useState(0.0);

  const calculateSubtotal = () =>
    Object.keys(cart)
      .reduce(
        (subtotal, itemName) =>
          subtotal + cart[itemName].quantity * parseFloat(cart[itemName].price),
        0
      )
      .toFixed(2);

  const calculateTotal = () =>
    parseFloat(
      parseFloat(calculateSubtotal()) +
        parseFloat(vendorData.packingHandlingCharges) +
        parseFloat(vendorData.serviceCharges) +
        // parseFloat(externalDeliveryRequired
        //   ? 5 * cutleryQuantity
        //   : 0) +
        deliveryCharge
    ).toFixed(2);

  const handleInputChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePaymentMethodChange = (e) =>
    setSelectedPaymentMethod(e.target.value);

  const clearCart = async () => {
    const token = Cookies.get("user_token");
    try {
      await axios.put(`/api/vendor/updatecart`, { token, cart: {} });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleProceedToPaymentOnline = async (amount) => {
    const isAddressComplete = Object.values(address).every((val) => val !== "");
    const isValidPhoneNumber = /^\d{10}$/.test(address.phoneNumber);

    if (!isAddressComplete || !isValidPhoneNumber) {
      toast.info("Kindly enter a complete address 🧐");
      if (!isValidPhoneNumber) {
        toast.info("Phone number must have 10 digits 🧐", { autoClose: 3000 });
      }
      return;
    }

    if (selectedPaymentMethod === "online") {
      const response = await axios.post(`/api/razorpay`, { amount });
      const json = await response.json();
      const order = json.order;

      const options = {
        key: process.env.RAZORPAY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Citikartt",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          const res = await axios.post(`/api/razorpay/paymentverification`, {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });
          const json = await res.json();

          if (json.signatureIsValid) {
            const response = await axios.post(`/api/order/create-food-order`, {
              userId: user._id,
              vendorId: params._id,
              products: cart,
              address,
              amount: total,
              paymentMethod: "Online",
              paymentInfo: {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              },
            });
            const json = await response.json();

            if (json.success) router.push("checkout/success");
          } else {
            toast.error(
              "Sorry, your payment couldn't be verified. Contact us for support",
              {
                autoClose: 3000,
              }
            );
          }
        },
        prefill: {
          name: "IIT Mandi foods",
          email: "email@user.com",
          phoneNo: "9999999999",
        },
      };

      const razorWindow = new window.Razorpay(options);
      razorWindow.open();
    } else if (selectedPaymentMethod === "payondelivery") {
      handleProceedToPaymentOffline();
    }
  };

  const handleProceedToPaymentOffline = async () => {
    setOrderPlaceButtonLoading(true);
    let isAddressComplete = Object.values(address).every((val) => val !== "");
    if (!isAddressComplete && address.instructions == "") {
      isAddressComplete = true;
    }
    const isValidPhoneNumber = /^\d{10}$/.test(address.phoneNumber);

    if (!isAddressComplete || !isValidPhoneNumber) {
      toast.info("Kindly enter complete details 🧐");
      if (!isValidPhoneNumber) {
        toast.info("Phone number must have 10 digits 🧐", { autoClose: 3000 });
      }
      setOrderPlaceButtonLoading(false);
      return;
    }

    const response = await axios.post(`/api/order/create-food-order`, {
      userId: user._id,
      vendorId: params._id,
      products: cart,
      address,
      amount: total,
      externalDeliveryRequired,
      cutleryQuantity,
      paymentMethod: "Pay on Delivery",
      paymentLink: `upi://pay?pa=${process.env.NEXT_PUBLIC_UPI_ID}&pn=Citikartt&am=${total}&cu=INR&tn=Payment at Citikartt`,
    });
    const json = response.data;

    if (json.success) {
      const { data } = await axios.post("/api/vendor/fetch-vendor-by-id", {
        _id: params._id,
      });

      try {
        await axios.post("/api/vendor/whatsapp/msg-to-group", {
          group_id: data.vendor.whatsapp_group_id,
          order_id: json.order._id,
          products: cart,
          user: user.name,
          address,
          instructions: address.instructions,
          amount: total,
          externalDeliveryRequired,
        });
      } catch (err) {
        console.log("Error in sending the WhatsApp message", err);
      }

      // Adding this order in the payouts section of the vendor
      try {
        const payouts_response = await axios.post(
          "https://citikartt.com/api/vendor/get-payouts",
          {
            orderId: json.order._id,
            vendorId: data.vendor._id,
            totalAmount: parseFloat(total),
            payPercentage: data.vendor.payPercentage,
            handlingCharge: vendorData.packingHandlingCharges,
            serviceCharge: vendorData.serviceCharges,
            externalDeliveryRequired,
            // cutleryQuantity,
            deliveryCharge,
            orderCreatedAt: json.order.createdAt,
          }
        );

        if (payouts_response.data.success) {
          try {
            const res = await axios.put(
              "https://citikartt.com/api/vendor/update-vendor-payouts",
              {
                _id: data.vendor._id,
                payouts: payouts_response.data.payouts,
              }
            );
            console.log(res.data);
          } catch (err) {
            console.log("Error in updating the payouts", err);
          }
        }
      } catch (err) {
        console.log("Error in getting the payouts", err);
      }

      router.push("checkout/success");

      setTimeout(async () => {
        try {
          await axios.post("/api/vendor/whatsapp/msg-to-user", {
            userName: user.name,
            userNumber: address.phoneNumber,
            amount: total,
          });
        } catch (err) {
          console.log("Error in sending the WhatsApp message", err);
        }
      }, 2000);

      if (externalDeliveryRequired) {
        setTimeout(async () => {
          try {
            await axios.post("/api/vendor/whatsapp/msg-to-delivery", {
              userName: user.name,
              order_id: json.order._id,
              products: cart,
              address: address,
              amount: total,
              vendorName: data.vendor.name,
              cutleryQuantity,
            });
          } catch (err) {
            console.log("Error in sending the WhatsApp message", err);
          }
        }, 4000);
      }

      clearCart();

      // try {
      //   await axios.post("/api/vendor/orderEmail", {
      //     vendorName: data.vendor.name,
      //   });
      // } catch (err) {
      //   console.log("Error in sending the email", err);
      // }
    } else {
      toast.error("Failed to place the order. Please try again later.", {
        autoClose: 3000,
      });
    }
    setOrderPlaceButtonLoading(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!Cookies.get("user_token")) {
      router.push("/auth/login");
      return;
    }

    const fetchUserData = async () => {
      setCartLoading(true);
      try {
        const response = await axios.post(`/api/user/fetch-user`, {
          userToken: Cookies.get("user_token"),
        });
        const json = response.data;

        if (json.success) {
          setCart(json.user.food_cart[0]);
          setUser(json.user);
        } else {
          console.error("Failed to fetch user:", json.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      setCartLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const vendorResponse = await axios.post(
        `/api/vendor/fetch-vendor-by-id`,
        {
          _id: params._id,
        }
      );
      const vendorJson = vendorResponse.data;

      if (vendorJson.success) {
        setVendorData({
          ...vendorData,
          deliveryRequirements: vendorJson.vendor.deliveryRequirements,
          deliveryCharges: vendorJson.vendor.deliveryCharges,
          serviceCharges: vendorJson.vendor.serviceCharges,
          packingHandlingCharges: vendorJson.vendor.packingHandlingCharges,
        });

        // Check the conditions and log the message here
        if (
          vendorJson.vendor.deliveryRequirements &&
          selectedCampus in vendorJson.vendor.deliveryRequirements
        ) {
          const subtotal = parseFloat(calculateSubtotal());

          if (
            subtotal >
              vendorJson.vendor.deliveryRequirements[selectedCampus].minOrder &&
            subtotal <
              vendorJson.vendor.deliveryRequirements[selectedCampus].maxOrder
          ) {
            setDeliveryCharge(
              parseFloat(
                vendorJson.vendor.deliveryRequirements[selectedCampus].charge
              )
            );
            setExternalDeliveryRequired(true);
          } else {
            setDeliveryCharge(
              parseFloat(vendorJson.vendor.deliveryCharges[selectedCampus])
            );
          }
        } else {
          setDeliveryCharge(
            parseFloat(vendorJson.vendor.deliveryCharges[selectedCampus])
          );
        }
      } else {
        console.error("Failed to fetch vendor:", vendorJson.message);
      }
    };

    fetchData();
  }, [cart]);

  // const total = calculateTotal();

  const [total, setTotal] = useState(0.0);
  useEffect(() => {
    const newTotal = calculateTotal();
    setTotal(newTotal);
  }, [
    cart,
    vendorData,
    externalDeliveryRequired,
    cutleryQuantity,
    deliveryCharge,
  ]);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="container mx-auto p-5 md:w-1/2">
        <h1 className="text-2xl font-semibold mb-8 text-center">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Items in Cart</h2>
          <div className="bg-white shadow-md rounded-lg overflow-auto">
            {!cartLoading ? (
              Object.keys(cart).map((itemName) => (
                <div
                  key={itemName}
                  className="flex justify-between items-center border-b border-gray-300 p-3"
                >
                  <div>
                    <p>{itemName}</p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {cart[itemName].quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold">
                      ₹
                      {(
                        parseFloat(cart[itemName].price) *
                        cart[itemName].quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <OvalLoader />
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-end mr-2">
          <h2 className="text-lg font-semibold mb-2 inline mr-4">Subtotal</h2>
          <p className="text-xl font-semibold text-right inline">
            ₹{calculateSubtotal()}
          </p>
        </div>

        {/* {externalDeliveryRequired && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Cutlery Requirement</h2>
            <div className="flex justify-between items-center border-b border-gray-300 p-3 shadow-md rounded-md">
              <div>1 Plate + 1 Spoon</div>
              <div className="flex">
                <div
                  id="quantityPill"
                  className={`flex mr-2 scale-[0.85] border ${
                    cutleryQuantity > 0
                      ? "border-gray-300 bg-gray-200" // Apply the grey background and different border for non-zero quantity
                      : "border-gray-300" // Default border for zero quantity
                  } rounded-md h-[28px]`}
                >
                  <button
                    disabled={cutleryQuantity === 0}
                    className="pl-3 pr-1 rounded-l-xl"
                    onClick={() => {
                      setCutleryQuantity((prev) =>
                        prev > 0 ? prev - 1 : prev
                      );
                    }}
                  >
                    -
                  </button>
                  <span className="px-2 border border-gray-100">
                    {cutleryQuantity}
                  </span>
                  <button
                    className="pr-2 pl-1 rounded-r-xl"
                    onClick={() => setCutleryQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="w-[40px]">₹ 5</span>
              </div>
            </div>
          </div>
        )} */}

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Shipping details</h2>
          <form>
            <div className="mb-3">
              <label
                htmlFor="hostel"
                className="block text-sm font-medium text-gray-700"
              >
                Hostel / House No
              </label>
              <input
                type="text"
                id="hostel"
                name="hostel"
                value={address.hostel}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="campus"
                className="block text-sm font-medium text-gray-700"
              >
                Campus
              </label>
              <select
                id="campus"
                name="campus"
                value={selectedCampus}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                disabled
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Catalyst">Catalyst (New Building)</option>
                <option value="Garpa">Garpa</option>
                <option value="Mind Tree">Mind Tree</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={address.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="instructions"
                className="block text-sm font-medium text-gray-700"
              >
                Any instructions? (optional)
              </label>
              <textarea
                type="text"
                id="instructions"
                name="instructions"
                value={address.instructions}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </form>
        </div>

        <hr className="border-gray-300 mb-6" />

        <div className="mb-6 p-2">
          <h2 className="text-lg font-semibold mb-2">Additional Charges</h2>
          {[
            {
              label: "Packaging and Handling Charges:",
              value: parseFloat(
                parseFloat(vendorData.packingHandlingCharges)
                // +
                //   (externalDeliveryRequired
                //   ? parseInt(5 * cutleryQuantity)
                //   : 0)
              ),
            },
            { label: "Service Charges:", value: vendorData.serviceCharges },
            // { label: "Cutlery Charges:", value: 5*cutleryQuantity },
            { label: "Delivery Charges:", value: deliveryCharge.toFixed(2) },
          ].map((item, index) => (
            <div key={index} className="mb-3 flex justify-between">
              <span>{item.label}</span>
              <span className="text-right font-semibold">₹{item.value}</span>
            </div>
          ))}
          <hr />
        </div>

        <div className="mb-2 flex justify-end mr-2">
          <h2 className="text-lg font-semibold mb-2 inline mr-4">Total</h2>
          <p className="text-xl font-semibold text-right inline">₹{total}</p>
        </div>

        <div className="mb-20 shadow-lg p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Select payment method</h2>
          <div className="mb-3">
            <div className="mt-1">
              <input
                type="radio"
                id="payondelivery"
                name="paymentMethod"
                value="payondelivery"
                checked={selectedPaymentMethod === "payondelivery"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="payondelivery">Pay on Delivery</label>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white text-center">
          <button
            className="md:w-1/2 w-full bg-black text-white font-semibold py-2 rounded-lg mx-1 hover:bg-gray-950 focus:outline-none border border-black my-1"
            onClick={() => {
              if (selectedPaymentMethod === "online") {
                handleProceedToPaymentOnline(total);
              } else if (selectedPaymentMethod === "payondelivery") {
                openModal();
              }
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Confirm Payment Modal"
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
        <h2 className="font-semibold text-lg">Confirm Order</h2>
        <p className="mt-[10px]">
          Are you sure you want to proceed with{" "}
          {selectedPaymentMethod == "payondelivery"
            ? "Pay on delivery"
            : "Pay Online"}
          ?
        </p>
        <div className="mt-[25px] flex justify-center">
          <button
            disabled={orderPlaceButtonLoading}
            onClick={handleProceedToPaymentOffline}
            className="bg-black rounded-md text-white px-4 py-2 mx-2 w-1/3 h-10"
          >
            {orderPlaceButtonLoading ? <OvalLoader /> : "Confirm"}
          </button>
          <button
            onClick={closeModal}
            className="mx-2 border border-gray-200 px-4 py-2 rounded-md w-1/3 h-10"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
