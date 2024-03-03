"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const PromotionalBanner = ({ banner_num }) => {
  const [banner, setBanner] = useState({});
  const [href, setHref] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("/api/banner/fetch", {
          banner_type: "promotional",
        });
        if (data.success) {
          const _banner = data.banners[banner_num - 1];
          setBanner(_banner);

          switch (_banner.link_type) {
            case "no_link":
              setHref("#");
              break;
            case "category":
              setHref(
                `browse-categories/${encodeURIComponent(_banner.category_id)}`
              );
              break;
            case "product":
              setHref(`user/product/view-product?id=${_banner.product_id}`);
              break;
            case "external_link":
              setHref(_banner.external_link);
              break;

            default:
              break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div>
      <Link href={href ? href : ""} target="_blank">
        <img src={banner.image} alt="" className="w-full" />
      </Link>
    </div>
  );
};

export default PromotionalBanner;
