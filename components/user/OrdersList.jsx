"use client";

import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MagnifyingLoader from "../utility/MagnifyingLoader";

const OrdersList = ({ filter }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.post("/api/order/fetch-user-orders", {
      userToken: Cookies.get("user_token"),
      filter,
    });
    console.log(response.data.orders);
    setOrders(response.data.orders);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="py-2 px-4" onClick={(e) => e.stopPropagation()}>
      {!loading ? (
        <ol>
          {orders.length ? (
            orders.map((order) => {
              return (
                <React.Fragment key={order._id}>
                  <li className="px-2 py-1 my-1 text-gray-600 text-sm">
                    <Link href={`/user/order?id=${order._id}`}>
                      <span className="text-[0.6em] text-gray-500 mr-3">
                        {formatTimestamp(order.createdAt)}
                      </span>
                      {order.cart.map((product) => {
                        return (
                          <span key={product.productName}>
                            {product.productName.slice(0, 25)}...
                          </span>
                        );
                      })}
                    </Link>
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

export default OrdersList;
