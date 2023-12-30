import Link from "next/link";
import React from "react";

const renderSubcategory = ({ counter }) => {
  return (
    <div className="overflow-hidden border relative w-[45vw] h-[45vw] md:w-[22vw] md:h-[22vw] rounded-md">
      <img
        src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/square-four-images/${counter}.jpg`}
        alt={counter}
        className="border-gray-300 border-1 object-cover w-full h-full"
      />
      <div className="absolute bottom-0 left-0 bg-black w-full h-30 opacity-50 flex items-center md:py-2">
        <span className="text-white font-bold text-left ml-2">
          View More {" >"}
        </span>
      </div>
    </div>
  );
};

const Subcategories = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">What are you looking for?</h1>
        <Link
          className="text-md underline mr-2"
          href={"/user/browse-categories"}
        >
          View All
        </Link>
      </div>

      <div className="md:hidden grid grid-cols-2 gap-4 mt-2 justify-center">
        {[1, 2, 3, 4].map((counter) => (
          <React.Fragment key={counter}>
            {renderSubcategory({ counter })}
          </React.Fragment>
        ))}
      </div>

      <div className="hidden md:flex justify-evenly mt-3 overflow-x-scroll">
        {[1, 2, 3, 4].map((counter) => (
          <React.Fragment key={counter}>
            {renderSubcategory({ counter })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Subcategories;
