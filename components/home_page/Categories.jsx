import { fetchCategories } from "@/utils/fetchCategories";
import Link from "next/link";

const Categories = async () => {
  const categories = await fetchCategories();

  return (
    <>
      <div className="flex justify-between items-center px-3">
        <h1 className="text-lg font-semibold">Categories</h1>
        <Link className="text-md underline mr-2" href={"/browse-categories"}>
          View Details
        </Link>
      </div>
      <div className="flex overflow-x-auto">
        {categories.map((category) => {
          return (
            <Link
              key={category._id}
              href={`/browse-categories/${category._id}`}
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
