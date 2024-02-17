"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import axios from "axios";
const renderSubcategory = ({ category }) => {
  let href = `user/browse-categories/${encodeURIComponent(
    category.category_id.categoryName
  )}`;
  return (
    <div className="overflow-hidden relative w-[45vw] h-[45vw] md:w-[22vw] md:h-[22vw] rounded-md mb-3">
      <Link href={href}>
        <img
          src={category.image}
          alt={category._id}
          className="border-gray-300 border-1 object-contain w-full h-full"
        />
      </Link>
    </div>
  );
};

const Subcategories = () => {
  const [subCategory, setSubcategories] = useState([]);
  const selectedLocation = useLocation();

  let show_food_cat = false;
  if (selectedLocation.city == "Mandi" || selectedLocation.city == "Kamand") {
    show_food_cat = true;
  }

  const fetchSubcategories = async () => {
    try {
      if (selectedLocation && selectedLocation._id) {
        const { data } = await axios.post(`/api/fetch-looking-for`, {
          id: selectedLocation._id,
        });
        setSubcategories(data.sections);
      } else {
        // console.error("Selected location or _id is undefined");
      }
    } catch (error) {
      // console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, [selectedLocation]);

  return (
    <>
      <div className="md:hidden grid  w-full ">
        {show_food_cat && (
          <div className=" overflow-hidden relative   rounded-md">
            <Link href="/food">
              <img
                src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/mandi_food_order.png`}
                alt=""
                className="border-gray-300 border-1 object-contain w-full h-full"
              />
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden grid grid-cols-2 gap-4 mt-2 justify-center">
        {subCategory &&
          subCategory.length > 0 &&
          subCategory.map((category, index) => (
            <React.Fragment key={index}>
              {renderSubcategory({ category })}
            </React.Fragment>
          ))}
      </div>

      <div className="hidden mt-3 md:grid grid-cols-4">
        {show_food_cat && (
          <div className="overflow-hidden relative w-[45vw] h-[45vw] md:w-[22vw] md:h-[22vw] rounded-md">
            <Link href="/food">
              <img
                src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/square-four-images/5.png`}
                alt=""
                className="border-gray-300 border-1 object-contain w-full h-full"
              />
            </Link>
          </div>
        )}

        {subCategory
          .slice(0, show_food_cat ? 3 : subCategory.length)
          .map((category, index) => (
            <React.Fragment key={index}>
              {renderSubcategory({ category })}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default Subcategories;
