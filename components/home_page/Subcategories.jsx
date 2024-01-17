"use client";
import Link from "next/link";
import React from "react";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";

const renderSubcategory = ({ counter }) => {
    let href = "";
    if(counter==1){
      href = "user/browse-categories/Stationary";
    }else if(counter==2){
      href = "user/browse-categories/Grocery";
    }else if(counter==3){
      href = "user/browse-categories/Electronics";
    }else if(counter==4){
      href = "user/browse-categories/Beauty%20and%20Grooming";
    }

  return (
    <div className="overflow-hidden relative w-[45vw] h-[45vw] md:w-[22vw] md:h-[22vw] rounded-md">
     <Link href={href}>
        <img
            src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/square-four-images/${counter}.jpg`}
            alt={counter}
            className="border-gray-300 border-1 object-contain w-full h-full"
          />
     </Link>
    </div>
  );
};

const Subcategories = () => {

  const selectedLocation = useLocation();
  // console.log("selectedLocation" , selectedLocation);
  let show_food_cat = false;
  if(selectedLocation.city == "Mandi"){
    show_food_cat = true;
  }
  const arrayToMap = show_food_cat ? [1, 2, 3] : [1, 2, 3, 4];
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
        {[1, 2, 3, 4].map((counter) => (
          <React.Fragment key={counter}>
            {renderSubcategory({ counter })}
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
        
        {arrayToMap.map((counter) => (
          <React.Fragment key={counter}>
            {renderSubcategory({ counter })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Subcategories;
