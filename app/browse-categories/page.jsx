"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import LoadingCategoryImage from "@/public/LoadingCategory.png";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Categories = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/category/fetch-categories");
      if (data.success) {
        const categories = data.categories;
        setCategories(categories);
      } else {
        return <>Oops... Something Went Wrong !</>;
      }
    })();
    setPageLoading(false);
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl mt-2">Browse Categories</h1>
      {!pageLoading ? (
        <div className="grid grid-cols-3 items-center px-2">
          {categories.map((category) => {
            return (
              <Link
                key={category._id}
                href={`/user/browse-categories/${category.categoryName}`}
                className="flex flex-col items-center cursor-pointer px-6 py-3"
              >
                <AspectRatio
                  className="flex items-center, justify-center"
                  ratio={1 / 1}
                >
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="p-1"
                  />
                </AspectRatio>
                <span className="text-gray-600 font-bold whitespace-nowrap text-[13px]">
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
