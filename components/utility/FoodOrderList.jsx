"use client";

import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
 
import MagnifyingLoader from "../Loading-Spinners/MagnifyingLoader";

const FoodOrdersList = ({ filter }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
        try{
            const { data } = await axios.post("/api/order/fetch-user-food-orders-web", {
                userToken: Cookies.get("user_token"),
                filter,
            });
            if (data.success) {
              setOrders(data.foodOrders.reverse());
              setLoading(false);
            } else {
                console.log("An error occurred" + data.error);
            }
        }catch(error){
            console.error('Error fetching or updating data:', error);
        }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000);
    return () => clearInterval(intervalId);
    
  }, []);

  var filteredOrders = [];
  if(filter == "active"){
    filteredOrders = orders.filter((order) => order.status.toLowerCase() !== "delivered");
  }else{
    filteredOrders = orders.filter((order) => order.status.toLowerCase() === "delivered");
  }

  return (
    <div className="py-2 px-4" onClick={(e) => e.stopPropagation()}>
      {!loading ? (
        <ol>
          {filteredOrders.length ? (
            filteredOrders.toReversed().map((order) => {
              return (
                <React.Fragment key={order._id}>
                  <li className="px-2 py-1 my-1 text-gray-600 text-sm">
                    <div>
                        <p className="font-bold text-gray-700 mr-3" style={{
                                // color: order.status === "delivered" ? "black" : "#83d429",
                                color:order.status === "processing"
                                ? "orange"
                                :order.status == "delivered"
                                ? "green"
                                : "#f7cd00",
                                fontWeight: 500,
                            }}>
                            {
                                order.status === "out_for_delivery"
                                    ? "OUT FOR DELIVERY".toUpperCase()
                                    : order.status === "delivered"
                                    ? "DELIVERED"
                                    : order.status.toUpperCase()
                            }
                        </p>
                      
                        {Object.keys(order.products).map((productName) => (
                            <p className="font-bold mt-2" style={{
                                fontSize: 14,
                                color: "#525156",
                              }}>
                            {order.products[productName].quantity} x{" "}
                                
                                {productName}
                            
                            </p>
                        ))}

                        <div className="flex"
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 12,
                                }}
                            >
                                <span
                                style={{
                                    color: "gray",
                                }}
                                >
                                {new Date(order.createdAt).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                                </span>
                                <span
                                style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                }}
                                >
                                ₹{order.amount} /-
                                </span>
                        </div>
                    </div>
                  </li>
                  <hr />
                </React.Fragment>
              );
            })
          ) : (
            <span className="text-gray-500 text-sm">
              No {filter === "current" ? "Active" : "Previous"} Orders
            </span>
          )}
        </ol>
      ) : (
        <MagnifyingLoader />
      )}
    </div>
  );
};

export default FoodOrdersList;
