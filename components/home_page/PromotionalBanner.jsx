import { fetchBanners } from "@/utils/fetchBanners";
import Link from "next/link";

const PromotionalBanner = async ({ banner_num }) => {
  let href;

  let banners = await fetchBanners("promotional");
  const banner = banners[banner_num - 1] || {};

  switch (banner.link_type) {
    case "no_link":
      href = "#";
      break;
    case "category":
      href = `browse-categories/${banner.category_id}`;
      break;
    case "product":
      href = `user/product/view-product?id=${banner.product_id}`;
      break;
    case "external_link":
      href = banner.external_link;
      break;

    default:
      break;
  }

  return (
    <Link href={href ? href : ""} target="_blank">
      <img src={banner.image} alt="" className="w-full" />
    </Link>
  );
};

export default PromotionalBanner;
