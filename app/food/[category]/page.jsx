"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OvalLoader from "@/components/Loading-Spinners/OvalLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import AlertBar from "@/components/utility/AlertBar";

const FoodCategory = ({ params }) => {
  const router = useRouter();
  const [vendorsData, setVendorsData] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await axios.post(
          "https://citikartt.com/api/vendor/fetch-all-vendors"
        );

        if (!data.success) {
          throw new Error("Network response was not ok");
        }
        setVendorsData(data.vendors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     router.push("/auth/login");
  //   }
  // }, []);

  const handleCampusChange = (e) => {
    const campus = e.target.value;
    setSelectedCampus(campus);

    if (campus === "All") {
      toast.info("Kindly select your campus", { autoClose: 3000 });
    }
  };

  // Define a custom sorting function to sort open vendors first
  const customSort = (a, b) => {
    if (a.openStatus && !b.openStatus) {
      return -1; // `a` is open and `b` is closed, so `a` comes first
    } else if (!a.openStatus && b.openStatus) {
      return 1; // `b` is open and `a` is closed, so `b` comes first
    }
    return 0; // Both have the same openStatus or both are closed
  };

  const renderVendorCard = (vendor) => (
    <div
      key={vendor._id}
      className="relative bg-white border rounded-lg shadow-md m-2 transition transform md:hover:scale-105"
      style={{
        width: "calc(100% - 1rem)",
        maxWidth: "300px",
        flexBasis: "45%",
        minWidth: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        className="w-full h-48"
        style={{
          backgroundImage: `url(${vendor.imageURI})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <h2 className="text-white text-sm md:text-md font-semibold">
            {vendor.name}
          </h2>
        </div>
      </div>
      <div>
        {selectedCampus === "All" ? (
          <div onClick={() => handleVendorClick(vendor)}>
            <button
              className={`${
                vendor.openStatus
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white py-2 px-4 rounded-b-md w-full`}
            >
              {vendor.openStatus ? "Order Now" : "Closed"}
            </button>
          </div>
        ) : vendor.openStatus ? (
          <Link href={`/food/order/${vendor._id}?campus=${selectedCampus}`}>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-b-md w-full">
              Order Now
            </button>
          </Link>
        ) : (
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-b-md w-full">
            Closed
          </button>
        )}
      </div>
    </div>
  );

  const handleVendorClick = (vendor) => {
    if (selectedCampus === "All") {
      toast.info("Kindly select your campus", { autoClose: 3000 });
    } else if (vendor.openStatus) {
      router.push(`/food/order/${vendor._id}?campus=${selectedCampus}`);
    }
  };

  const filteredVendors =
    selectedCampus === "All"
      ? vendorsData.filter(
          (vendor) =>
            params.category === vendor.category &&
            (isDevelopment || vendor.name !== "test")
        )
      : vendorsData.filter(
          (vendor) =>
            params.category === vendor.category &&
            vendor.deliveryLocations.includes(selectedCampus) &&
            (isDevelopment || vendor.name !== "test")
        );
  console.log(params.category);
  // Sort the vendors based on customSort
  filteredVendors.sort(customSort);

  return (
    <div className="p-4">
      <div className="bg-red-500 text-white">
        <AlertBar />
      </div>

      <div className="sticky top-0 bg-white z-50 py-2">
        <div className="flex justify-center">
          <select
            className="bg-white border rounded-md px-3 py-2"
            onChange={handleCampusChange}
            value={selectedCampus}
          >
            <option value="All">Select Campus</option>
            <option value="North">North Campus</option>
            <option value="South">South Campus</option>
            <option value="Catalyst">Catalyst (New Building)</option>
            <option value="Garpa">Garpa</option>
            <option value="Mind Tree">Mind Tree</option>
            <option value="Salgi">Salgi</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <OvalLoader />
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredVendors.map(renderVendorCard)}
        </div>
      )}
    </div>
  );
};

export default FoodCategory;
