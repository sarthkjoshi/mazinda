// "use client";
import Link from "next/link";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchBanners } from "@/utils/fetchBanners";

const TopCarousel = async () => {
  // const [banners, setBanners] = useState([]);
  const banners = await fetchBanners("carousel");

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   // dots: false,
  // };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.post("/api/banner/fetch", {
  //         banner_type: "carousel",
  //       });
  //       console.log(data);
  //       if (data.success) {
  //         setBanners(data.banners);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {banners.map((banner, index) => {
          let href = "";

          switch (banner.link_type) {
            case "no_link":
              href = "#";
              break;
            case "category":
              href = `browse-categories/${encodeURIComponent(
                banner.category_id
              )}`;
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
            <CarouselItem>
              <Link href={href} target={href == "#" ? "" : "_blank"}>
                <img
                  key={banner._id}
                  src={banner.image}
                  alt="image"
                  className="w-full"
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    // <Slider {...settings}>
    //   {banners.map((banner) => {
    //     let href = "";

    //     switch (banner.link_type) {
    //       case "no_link":
    //         href = "#";
    //         break;
    //       case "category":
    //         href = `browse-categories/${encodeURIComponent(
    //           banner.category_id
    //         )}`;
    //         break;
    //       case "product":
    //         href = `user/product/view-product?id=${banner.product_id}`;
    //         break;
    //       case "external_link":
    //         href = banner.external_link;
    //         break;

    //       default:
    //         break;
    //     }

    //     return (
    //       <Link href={href} target={href == "#" ? "" : "_blank"}>
    //         <img
    //           key={banner._id}
    //           src={banner.image}
    //           alt="image"
    //           className="w-full"
    //         />
    //       </Link>
    //     );
    //   })}
    // </Slider>
  );
};

export default TopCarousel;
