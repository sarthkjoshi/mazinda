"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/category/fetch-categories");
      if (data.success) {
        setCategories(data.categories);
      } else {
        return <>Oops... Something Went Wrong !</>;
      }
    })();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-3">
        <h1 className="text-lg font-semibold">Categories</h1>
        <Link
          className="text-md underline mr-2"
          href={"/user/browse-categories"}
        >
          View Details
        </Link>
      </div>
      <div className="flex overflow-x-auto">
        {categories.map((category) => {
          return (
            <Link
              key={category._id}
              href={`/user/browse-categories/${category.categoryName}`}
              className="m-2 p-2 flex flex-col items-center cursor-pointer"
            >
              <img
                className="max-w-[70px] min-w-[70px] md:max-w-[100px] md:min-w-[100px]"
                src={category.categoryImage}
                alt={category.categoryName}
              />
              <span className="text-gray-600 font-semibold text-sm text-center whitespace-nowrap">
                {category.categoryName}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
