import React from "react";

const AnalyticsComponent = ({
  productsSold,
  ordersReceived,
  stockAvailable,
  totalStockValue,
}) => {
  return (
    <div className="flex items-center justify-between bg-white mb-4 mx-2">
        
      <div className="flex flex-col items-center border px-3 py-1 rounded-lg shadow">
          <p className="text-md font-bold">220</p>
          <p className="text-[8px] text-gray-600">Products Sold Today</p>
      </div>

      <div className="flex flex-col items-center border px-3 py-1 rounded-lg shadow">
          <p className="text-md font-bold">23</p>
          <p className="text-[8px] text-gray-600">Orders Received</p>
      </div>

      <div className="flex flex-col items-center border px-3 py-1 rounded-lg shadow">
          <p className="text-md font-bold">2334</p>
          <p className="text-[8px] text-gray-600">Stock Available</p>
      </div>

      <div className="flex flex-col items-center border px-3 py-1 rounded-lg shadow">
          <p className="text-md font-bold">23087</p>
          <p className="text-[8px] text-gray-600">Total Stock Value</p>
      </div>

    </div>
  );
};

export default AnalyticsComponent;
