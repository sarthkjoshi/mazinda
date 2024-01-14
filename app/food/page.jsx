import React   from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
const HomePage = () => {

  const categories = [
    {
      name: "Food",
      imageURI:
        "https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1daa9086-0f1d-4d65-86b5-4a15a36d08d4/traditional-food-around-the-world-Travlinmad.jpg",
      availabilityStatus: true,
    },
    {
      name: "Bakery",
      imageURI:
        "https://static.toiimg.com/thumb/48201473/best-bakery-guide.jpg?width=1200&height=900",
      availabilityStatus: true,
    },
     
  ];

  const rendorCategoriesCard = (category) => (
    // <Link href={(category.name.toLowerCase() === 'food' || category.name.toLowerCase() === 'bakery') ? `/${category.name.toLowerCase()}` : `https://mazinda.com/user/browse-categories/${category.name}`} key={category.name}>
    <Link href={`/food/${category.name.toLowerCase()}`} key={category.name}>
      <div
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
            backgroundImage: `url(${category.imageURI})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="p-2"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <h2 className="text-white text-lg font-semibold">
              {category.name}
            </h2>
          </div>
        </div>
        <div>
          <button
            className={`${
              category.availabilityStatus
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white py-2 px-1 rounded-b-md w-full text-[0.9rem]`}
          >
            {category.availabilityStatus
              ? "Explore nearby stores"
              : "Coming Soon"}
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center">
        {categories.map(rendorCategoriesCard)}
      </div>
    </div>
  )
}

export default HomePage