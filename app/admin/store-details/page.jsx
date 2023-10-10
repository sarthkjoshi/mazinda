"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useSearchParams } from "next/navigation";
import OvalLoader from "@/components/admin/utility/OvalLoader";
import { toast } from 'react-toastify'

const StoreDetails = () => {
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.post("/api/store/fetch-store-by-id", {
          id,
        });
        if (response.data.success) {
          setStoreData(response.data.store);
          setLoading(false);
        } else {
          console.error("Error while fetching the store");
        }
      } catch (error) {
        console.error("Error fetching store data: ", error);
      }
    };

    fetchStoreData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    console.log(storeData);
    setIsEditing(false);
    try {
      // Make an API call to save the edited data
      const response = await axios.put("/api/store/update-store", {storeData});
      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
      // After successful save, set editing mode to false
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving store data: ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the storeData object with the edited value
    setStoreData({
      ...storeData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-sm rounded-xl">
      <h1 className="text-3xl font-semibold mb-4">Store Details</h1>
      {loading ? (
        <OvalLoader />
      ) : (
        <>
          {isEditing ? (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Owner Name:</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={storeData.ownerName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Store Name:</label>
                  <input
                    type="text"
                    name="storeName"
                    value={storeData.storeName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Mobile Number:</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={storeData.mobileNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Alternate Mobile Number:
                  </label>
                  <input
                    type="text"
                    name="alternateMobileNumber"
                    value={storeData.alternateMobileNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={storeData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Image URI:</label>
                  <input
                    type="text"
                    name="imageURI"
                    value={storeData.imageURI}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={storeData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* <div>
                  <label className="block font-semibold">Image URI:</label>
                  <input
                    type="text"
                    name="imageURI"
                    value={storeData.imageURI}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div> */}
              </div>

              {/* <div className="space-x-4">
                <label className="font-semibold text-lg">Open Status:</label>
                <input
                  type="checkbox"
                  name="openStatus"
                  checked={storeData.openStatus}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div> */}
              <div className="w-1/2">
                <label className="block text-xl font-semibold">
                  Approved Status:
                </label>
                <select
                  name="approvedStatus"
                  value={storeData.approvedStatus}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </form>
          ) : (
            <div>
              <div>
                <div>
                  {storeData.approvedStatus === "pending" ? (
                    <p className="text-xl my-2 bg-yellow-200 px-3 py-1 rounded-full w-fit text-yellow-800">
                      Pending
                    </p>
                  ) : storeData.approvedStatus === "approved" ? (
                    <p className="text-xl my-2 bg-green-200 px-3 py-1 rounded-full w-fit text-green-800">
                      Approved
                    </p>
                  ) : storeData.approvedStatus === "rejected" ? (
                    <p className="text-xl my-2 bg-red-200 px-3 py-1 rounded-full w-fit text-red-800">
                      Rejected
                    </p>
                  ) : (
                    "Error while displaying the approval status"
                  )}
                </div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Owner Name:
                </p>
                <p className="inline-block mx-2 text-lg">
                  {storeData.ownerName}
                </p>
              </div>
              <div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Store Name:
                </p>
                <p className="inline-block mx-2 text-lg">
                  {storeData.storeName}
                </p>
              </div>
              <div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Mobile Number:
                </p>
                <p className="inline-block mx-2 text-lg">
                  {storeData.mobileNumber}
                </p>
              </div>
              <div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Alternate Mobile Number:
                </p>
                <p className="inline-block mx-2 text-lg">
                  {storeData.alternateMobileNumber}
                </p>
              </div>
              <div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Email:
                </p>
                <p className="inline-block mx-2 text-lg">{storeData.email}</p>
              </div>
              <div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Image URI:
                </p>
                <p className="inline-block mx-2 text-lg">
                  {storeData.imageURI}
                </p>
              </div>
              {/* <div>
                <p className="inline-block mx-2 my-3 font-semibold w-[240px] text-lg">
                  Open Status:
                </p>
                <p className="inline-block mx-2 text-lg">
                  {storeData.openStatus ? "Open" : "Closed"}
                </p>
              </div> */}
            </div>
          )}

          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-[#fb691e] my-2 text-white px-4 py-2 rounded-md hover:opacity-70 focus:outline-none"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-[#fb691e] my-5 text-white px-10 py-2 rounded-md hover:opacity-70 focus:outline-none"
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default StoreDetails;
