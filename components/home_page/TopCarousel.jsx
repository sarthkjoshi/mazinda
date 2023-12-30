"use client";

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
        return (
          <img
            key={counter}
            src={`https://mazindabucket.s3.ap-south-1.amazonaws.com/home-page/top-carousel/${counter}.jpeg`}
            alt="image"
          />
        );
      })}
    </Slider>
  );
};

export default TopCarousel;
