import React from "react";

const AvailableCategories = () => {
  // Sample category data
  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Mobile Phones", "Laptops", "Cameras", "Accessories"],
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids", "Accessories"],
    },
    {
      id: 3,
      name: "Home Decor",
      subcategories: ["Furniture", "Lighting", "Home Accents", "Rugs"],
    },
  ];

  return (
    <div className="bg-white p-5">
      <h1 className="text-2xl font-semibold mb-2">Available Categories</h1>
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg w-56 h-56 m-2"
          >
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {category.name}
            </h2>
            <ul className="list-disc ml-4">
              {category.subcategories.map((subcategory) => (
                <li
                  key={subcategory}
                  className="text-gray-600 text-sm list-none inline-block bg-gray-300 m-1 rounded-full py-1 px-2"
                >
                  {subcategory}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCategories;
