import Link from "next/link";
import React from "react";

const renderSubcategory = ({ counter }) => {
  return (
    <div className="overflow-hidden relative w-[45vw] h-[45vw] md:w-[22vw] md:h-[22vw] rounded-md">
      <img
        src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/square-four-images/${counter}.jpg`}
        alt={counter}
        className="border-gray-300 border-1 object-contain w-full h-full"
      />
    </div>
  );
};

const Subcategories = () => {
  return (
    <>
      <div className="md:hidden grid grid-cols-2 gap-4 mt-2 justify-center">
        {[1, 2, 3, 4].map((counter) => (
          <React.Fragment key={counter}>
            {renderSubcategory({ counter })}
          </React.Fragment>
        ))}
      </div>

      <div className="hidden mt-3 md:grid grid-cols-4">
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
