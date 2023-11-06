"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import LoadingCategoryImage from "@/public/LoadingCategory.png";
import Link from "next/link";

const Categories = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const response = await axios.post("/api/category/fetch-categories");
    if (response.data.success) {
      const categories = response.data.categories;
      setCategories(categories);
    } else {
      return <>Oops... Something Went Wrong !</>;
    }
    setPageLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl">Browse Categories</h1>
      {!pageLoading ? (
        <div className="flex flex-wrap justify-center">
          {categories.map((category) => {
            return (
              <Link
                key={category._id}
                href={`/user/browse-categories/${category.categoryName}`}
                className="m-2 p-2 flex flex-col items-center cursor-pointer"
              >
                <img
                  // className="rounded-full"
                  style={{ maxWidth: '80px', minWidth: '80px' }}
                  src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/${category.categoryImage}`}
                  alt={category.categoryName}
                />
                <span className="text-gray-600 font-bold">
                  {category.categoryName}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
            <Image
              className="m-2 p-2"
              src={LoadingCategoryImage}
              alt="Loading"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Categories;
