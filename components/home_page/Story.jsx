"use client";

import mazinda_logo_mini from "@/public/logo/logo_mazinda_mini.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

// const data = [
//   {
//     _id: 1,
//     storeName: "Simply Best",
//     imageURI: "https://cdn-icons-png.flaticon.com/512/1041/1041883.png",
//   },
//   {
//     _id: 2,
//     storeName: "Random footwear",
//     imageURI:
//       "https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png",
//   },
//   {
//     _id: 3,
//     storeName: "Apni Dukaan",
//     imageURI:
//       "https://png.pngtree.com/png-vector/20200415/ourmid/pngtree-store-closed-due-to-covid-19-pandemic-vector-image-illustration-png-image_2181732.jpg",
//   },
//   {
//     _id: 5,
//     storeName: "Simply Best",
//     imageURI:
//       "https://img.freepik.com/premium-psd/store-promoting-discount-cardboard-with-shop-bag-3d-icon_158757-843.jpg",
//   },
//   {
//     _id: 6,
//     storeName: "Simply Best",
//     imageURI:
//       "https://img.freepik.com/premium-psd/store-promoting-discount-cardboard-with-shop-bag-3d-icon_158757-843.jpg",
//   },
//   {
//     _id: 7,
//     storeName: "Simply Best",
//     imageURI:
//       "https://img.freepik.com/premium-psd/store-promoting-discount-cardboard-with-shop-bag-3d-icon_158757-843.jpg",
//   },
// ];
const Story = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("/api/story/fetch-stories");
        setStories(data.stories); // Assuming the API response is an array
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    })();
  }, []);

  return (
    <div className="flex overflow-x-auto px-5 space-x-2">
      <div className="flex items-center gap-2 flex-col min-w-[90px]">
        <div className="border-2 border-orange-500 rounded-full p-2 overflow-hidden">
          <Image
            className="object-contain aspect-square w-16 h-16"
            src={mazinda_logo_mini}
            alt="Mazinda Logo"
            width={64}
            height={64}
          />
        </div>
        <p className="font-semibold text-sm text-center flex items-center gap-[2px]">
          <span>Mazinda India</span>
          <img
            className="w-4 h-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eo_circle_orange_white_checkmark.svg/2048px-Eo_circle_orange_white_checkmark.svg.png"
            alt=""
          />
        </p>
      </div>

      {stories.map((story) => (
        <div
          key={story._id}
          className="flex items-center gap-2 flex-col min-w-[90px]"
        >
          <Link
            href={"/user/story"}
            className="border-2 border-orange-500 rounded-full p-2 overflow-hidden"
          >
            <img
              className="object-contain aspect-square w-16 h-16"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={story.storeDetails.imageURI}
              alt={`${story.storeDetails.storeName} Logo`}
            />
          </Link>
          <p className="font-semibold text-sm text-center">
            {story.storeDetails.storeName.slice(0, 8)}...
          </p>
        </div>
      ))}
    </div>
  );
};

export default Story;
