"use client"

import AddNewStock from '@/components/store/stock/NewStock';
import React, { useState } from 'react';

const StocksPage = () => {
  const [isCreateStockExpanded, setCreateStockExpanded] = useState(false);
  const [isAddStockExpanded, setAddStockExpanded] = useState(false);

  const toggleCreateStock = () => {
    setCreateStockExpanded(!isCreateStockExpanded);
  };

  const toggleAddStock = () => {
    setAddStockExpanded(!isAddStockExpanded);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a new Stock</h1>
      <ul>
        <li className='border border-gray-400 rounded-md px-2 py-1 my-2'>
          <button
            className="text-gray-500"
            onClick={toggleCreateStock}
          >
            Create a New Fresh Stock
          </button>
          {isCreateStockExpanded && (
            <div className="p-2">
              <AddNewStock />
            </div>
          )}
        </li>
        <li className='border border-gray-400 rounded-md px-2 py-1 my-2'>
          <button
            className="text-gray-500"
            onClick={toggleAddStock}
          >
            Import and Edit Stock From Suggestions
          </button>
          {isAddStockExpanded && (
            <div className="p-2">
              {/* Content for adding from existing stock */}
              {/* You can add input fields, forms, or other elements here */}
              <p>Adding from existing stock...</p>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default StocksPage;