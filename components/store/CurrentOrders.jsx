import React from "react";

const CurrentOrders = () => {
  const orders = [
    {
      id: 1,
      date: "2023-10-15",
      time: "10:00 AM",
      productName: "Product A",
      quantity: 5,
      status: "Accepted",
    },
    {
      id: 2,
      date: "2023-10-16",
      time: "2:30 PM",
      productName: "Product B",
      quantity: 3,
      status: "Rejected",
    },
    // Add more orders here...
  ];

  return (
    <div className="p-4 md:w-3/4 md:mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Current Orders
      </h1>
      <div className="rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Product</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 text-center">{order.date}</td>
                <td className="py-2 text-center">{order.time}</td>
                <td className="py-2 text-center">
                  {order.productName} ✕{" "}
                  <span className="bg-yellow-300 text-yellow-500 px-2 py-1 rounded-full text-sm">
                    {order.quantity}
                  </span>
                </td>
                <td
                  className={`rounded-full text-center ${
                    order.status === "Accepted"
                      ? "text-green-600"
                      : order.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentOrders;
