"use client";

import React, { useState } from "react";

const ProductApproval = () => {
  const testPendingRequests = [
    {
      id: 1,
      date: "2023-10-01",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product A",
      seller: "Seller X",
      category: "Electronics",
      mrp: 1000,
      topDeal: false,
      trending: true,
    },
    {
      id: 2,
      date: "2023-10-02",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product B",
      seller: "Seller Y",
      category: "Clothing",
      mrp: 500,
      topDeal: true,
      trending: false,
    },
    {
      id: 3,
      date: "2023-10-03",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product C",
      seller: "Seller Z",
      category: "Home & Garden",
      mrp: 1200,
      topDeal: true,
      trending: true,
    },
    {
      id: 4,
      date: "2023-10-04",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product D",
      seller: "Seller W",
      category: "Books",
      mrp: 300,
      topDeal: false,
      trending: true,
    },
    {
      id: 5,
      date: "2023-10-05",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product E",
      seller: "Seller V",
      category: "Toys",
      mrp: 800,
      topDeal: true,
      trending: false,
    },
    {
      id: 6,
      date: "2023-10-06",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product F",
      seller: "Seller U",
      category: "Electronics",
      mrp: 1500,
      topDeal: true,
      trending: true,
    },
    {
      id: 7,
      date: "2023-10-07",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product G",
      seller: "Seller T",
      category: "Clothing",
      mrp: 600,
      topDeal: false,
      trending: true,
    },
    {
      id: 8,
      date: "2023-10-08",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product H",
      seller: "Seller S",
      category: "Home & Garden",
      mrp: 900,
      topDeal: true,
      trending: false,
    },
    {
      id: 9,
      date: "2023-10-09",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product I",
      seller: "Seller R",
      category: "Electronics",
      mrp: 1100,
      topDeal: false,
      trending: true,
    },
    {
      id: 10,
      date: "2023-10-10",
      photo:
        "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
      name: "Product J",
      seller: "Seller Q",
      category: "Books",
      mrp: 400,
      topDeal: true,
      trending: false,
    },
  ];

  const [approvalData, setApprovalData] = useState(testPendingRequests);

  const handleCostPriceChange = (productId, event) => {
    const newApprovalData = approvalData.map((product) =>
      product.id === productId
        ? { ...product, costPrice: event.target.value }
        : product
    );
    setApprovalData(newApprovalData);
  };

  const handleTopDealChange = (productId) => {
    const newApprovalData = approvalData.map((product) =>
      product.id === productId
        ? { ...product, topDeal: !product.topDeal }
        : product
    );
    setApprovalData(newApprovalData);
  };

  const handleTrendingChange = (productId) => {
    const newApprovalData = approvalData.map((product) =>
      product.id === productId
        ? { ...product, trending: !product.trending }
        : product
    );
    setApprovalData(newApprovalData);
  };

  const handleAccept = (productId) => {
    // Implement the logic to accept the product request
    // You can remove the accepted product from the list or mark it as accepted.
  };

  const handleRequest = (productId) => {
    // Implement the logic to request more information for the product
    // You can send a request to the seller for additional details.
  };

  return (
    <div className="h-screen overflow-y-auto">
      <h1 className="font-semibold text-3xl my-4">Product Requests</h1>
      <table className='bg-white rounded-xl'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Seller</th>
            <th>Category</th>
            <th>MRP</th>
            <th>Cost Price</th>
            <th>Top Deal</th>
            <th>Trending</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {approvalData.map((product) => (
            <React.Fragment key={product.id}>
              <tr>
                <td className="py-3 px-4 text-sm">{product.date}</td>
                <td className="py-3 px-4 text-sm">
                  <img src={product.photo} alt={product.name} width="50" height="50" className='rounded-full'/>
                </td>
                <td className="py-3 px-4 text-sm">{product.name}</td>
                <td className="py-3 px-4 text-sm">{product.seller}</td>
                <td className="py-3 px-4 text-sm"><span className='bg-gray-600 text-white px-2 py-1 rounded-full'>{product.category}</span></td>
                <td className="py-3 px-4 text-md">₹{product.mrp}</td>
                <td className="py-3 px-4 text-sm">
                  <input
                    className='border border-gray-500 rounded-xl px-3 py-1'
                    type="text"
                    value={product.costPrice}
                    onChange={(event) => handleCostPriceChange(product.id, event)}
                  />
                </td>
                <td className="py-3 px-4 text-sm">
                  <input
                    type="checkbox"
                    checked={product.topDeal}
                    onChange={() => handleTopDealChange(product.id)}
                  />
                </td>
                <td className="py-3 px-4 text-sm">
                  <input
                    type="checkbox"
                    checked={product.trending}
                    onChange={() => handleTrendingChange(product.id)}
                  />
                </td>
                <td className="py-3 px-4 text-sm">
                  <button className="mx-2 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-full" onClick={() => handleAccept(product.id)}>Accept</button>
                  <button className="mx-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full" onClick={() => handleRequest(product.id)}>Reject</button>
                </td>
              </tr>
              <tr>
                <td colSpan="10">
                  <hr />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductApproval;