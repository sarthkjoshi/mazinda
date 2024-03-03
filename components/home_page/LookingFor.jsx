"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLocation, useLocationLoading } from "@/contexts/LocationContext";
import axios from "axios";

const LookingFor = () => {
  const selectedLocation = useLocation();
  const [banners, setBanners] = useState([]);

  let show_food_cat = false;
  if (selectedLocation.city == "Mandi" || selectedLocation.city == "Kamand") {
    show_food_cat = true;
  }

  const renderLookingFor = (banner) => {
    let href =
      banner.link_type === "category"
        ? `browse-categories/${encodeURIComponent(banner.category_id)}`
        : "#";
    return (
      <div className="overflow-hidden relative w-[45vw] h-[45vw] md:w-[22vw] md:h-[22vw] rounded-md mb-3">
        <Link href={href}>
          <img
            src={banner.image}
            alt={banner._id}
            className="border-gray-300 border-1 object-contain w-full h-full"
          />
        </Link>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("/api/banner/fetch", {
          banner_type: "looking-for",
        });
        console.log(data);
        if (data.success) {
          setBanners(data.banners);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
        {banners.map((banner, index) => (
          <React.Fragment key={index}>
            {renderLookingFor(banner)}
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

        {banners
          .slice(0, show_food_cat ? 3 : banners.length)
          .map((banner, index) => (
            <React.Fragment key={index}>
              {renderLookingFor(banner)}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default LookingFor;
