import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import OvalLoader from "../admin/utility/OvalLoader";
import Link from "next/link";

const CurrentOrders = () => {

  const [pageLoading, setPageLoading] = useState(true)
  const [currentOrders, setCurrentOrders] = useState([])

  const fetchData = async () => {
    const storeToken = Cookies.get('store_token')
    const response = await axios.post('/api/order/fetch-store-orders', { storeToken })
    console.log(response.data)
    setCurrentOrders(response.data.currentOrders);
    setPageLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="p-4 md:w-3/4 md:mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Current Orders
      </h1>
      {!pageLoading ? <div className="rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id}>
                <td className="py-2 text-center">{order.createdAt}</td>
                <td className="py-2 text-center">{order.updatedAt}</td>
                <td className="py-2 text-center">
                  {order.cart.map( item => {
                    return <Link key={item.productID} href={`product/view-product?id=${item.productID}`} target="_blank" className="block">{item.productName.slice(0,25)} x {item.quantity}</Link>
                  })} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <OvalLoader />}
    </div>
  );
};

export default CurrentOrders;
