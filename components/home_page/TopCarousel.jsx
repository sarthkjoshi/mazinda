"use client";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    // dots: false,
  };

  return (
    <Slider {...settings}>
      {[1, 2, 3, 4].map((counter) => {
        let href = "";
        let target = "";
        if(counter==2){
          href = "user/browse-categories/Stationary";
        }else if(counter==3){
          href = "https://api.whatsapp.com/send?phone=917876901177&text=Hey Mazinda,%0APlease help me out.";
          target = "_blank"
        }else if(counter==4){
          href = "user/browse-categories/Grocery";
          target = "_blank"
        }

        return (
          <Link href={href} target={target}>
            <img
              key={counter}
              src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/top-carousel/${counter}.jpeg`}
              alt="image"
            />
          </Link>
        );
      })}
    </Slider>
  );
};

export default TopCarousel;
